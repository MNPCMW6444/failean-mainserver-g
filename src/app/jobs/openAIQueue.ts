import Queue from "bull";
import { ocServerDomain } from "../setup/config";
import { pubsub } from "../setup/redisSetup";
import { getIdeaModel } from "../mongo-models/data/ideas/ideaModel";
import aideatorPromptMap from "../../content/prompts/aideatorPromptMap";
import {
  API,
  PromptName,
  PromptPart,
  WhiteModels,
} from "@failean/shared-types";
import { getPromptResultModel } from "../mongo-models/data/prompts/promptResultModel";
import { callOpenAI } from "../util/data/prompts/openAIUtil";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import stringSimilarity from "../util/string-similarity";
import { INVALID_PROMPT_MESSAGE } from "../util/messages";
import { safeStringify } from "../util/jsonUtil";
import axios from "axios";
import { discoverService } from "../setup/AWSDiscovery";

export const serverAdapter = new ExpressAdapter();

type WhiteUser = WhiteModels.Auth.WhiteUser;
let openAIQueue: any;
// Create a new Bull queue
discoverService("us-east-1", {
  NamespaceName: "dev",
  ServiceName: "redis-s",
  MaxResults: 10,
})
  .then((ip) => {
    console.log(`Connecting to bull Redis at ${ip}:6379`);

    openAIQueue = new Queue("openAIQueue", {
      redis: {
        host: ip,
        port: 6379,
      },
    });

    serverAdapter.setBasePath("/admin/queues");

    openAIQueue.on("error", (error: any) => {
      console.error(`A queue error happened: ${error}`);
    });

    createBullBoard({
      queues: [new BullAdapter(openAIQueue)],
      serverAdapter: serverAdapter,
    });

    // Process jobs using the processJob function
    openAIQueue.process(processJob);
  })
  .catch((err) => {
    //console.error(`An error occurred during service discovery: ${err}`);
  });

// Define your job processing function
const processJob = async (job: any) => {
  const PromptResultModel = getPromptResultModel();
  const ideaModel = getIdeaModel();
  try {
    const { user, ideaID, promptName, feedback, reqUUID } = job.data;
    if (user.subscription !== "tokens") {
      return;
    }
    const idea = await ideaModel.findById(ideaID);
    let dependencies: string[];
    const prompt = aideatorPromptMap[promptName];
    if (prompt) {
      let promises = prompt.prompt.map(async (promptPart: PromptPart) => {
        if (promptPart.type === "variable" && promptPart.content !== "idea") {
          let promptRes = await PromptResultModel.find({
            owner: user._id,
            ideaID,
            promptName: promptPart.content,
          });
          return {
            x: promptRes[promptRes.length - 1]?.data,
          };
        }
      });

      await Promise.all(promises).then(async (updatedPropmtResult) => {
        dependencies = updatedPropmtResult.map((r: any) => {
          return r;
        });

        const cleanDeps: string[] = [];
        dependencies.forEach((dep) => {
          if (dep) cleanDeps.push(dep);
        });
        let i = 0;

        let missing = false;

        const constructedPrompt = prompt.prompt.map(
          (promptPart: PromptPart) => {
            if (promptPart.type === "static") return promptPart.content;
            else if (promptPart.type === "variable") {
              if (promptPart.content === "idea") return idea?.idea;
              i++;
              const res = (cleanDeps[i - 1] as any)?.x;
              missing = !missing && !(res?.length > 1);
              return res;
            }
          }
        );

        if (missing) throw new Error("Missing dependencies");

        const promptResult =
          feedback?.length &&
          feedback?.length > 1 &&
          (await PromptResultModel.find({
            owner: user._id,
            ideaID,
            promptName,
          }));

        const completion = await callOpenAI(
          user as unknown as WhiteUser,
          prompt.role,
          promptResult && [promptResult.length - 1] &&
            promptResult[promptResult.length - 1].data
            ? [
                { role: "user", content: constructedPrompt.join("") },
                {
                  role: "assistant",
                  content: promptResult[promptResult.length - 1].data,
                },
                { role: "user", content: feedback },
              ]
            : [{ role: "user", content: constructedPrompt.join("") }],
          promptName,
          reqUUID
        );

        if (completion === -1) throw new Error("Acoount error");
        else if (completion === -2) throw new Error("No Tokens");
        else {
          if (
            stringSimilarity(
              completion.data.choices[0].message?.content + "",
              INVALID_PROMPT_MESSAGE
            ) > 0.6
          )
            axios
              .post(
                ocServerDomain + "/log/logInvalidPrompt",
                {
                  stringifiedCompletion: safeStringify(completion),
                  prompt: constructedPrompt.join(""),
                  result: completion.data.choices[0].message?.content,
                  promptName,
                  ideaID,
                },
                {
                  auth: {
                    username: "client",
                    password: process.env.OCPASS + "xx",
                  },
                }
              )
              .catch((err) => console.error(err));
          const savedResult = new PromptResultModel({
            owner: user._id,
            ideaID,
            promptName,
            data: completion.data.choices[0].message?.content,
            reason:
              feedback?.length && feedback?.length > 1 ? "feedback" : "run",
          });
          await savedResult.save();
        }
      });
    }
    pubsub.publish("JOB_COMPLETED", {
      jobCompleted: (job?.id || "8765") + "",
    });
    console.log("Published update for job ", {
      jobCompleted: (job?.id || "8765") + "",
    });
  } catch (error) {
    console.error(`An error occurred during job processing: ${error}`);
    pubsub.publish("JOB_COMPLETED", {
      jobCompleted: (job?.id || "8765") + "",
      status: "error",
      message: error,
    });
  }
};

export const addJobsToQueue = async (
  user: WhiteModels.Auth.WhiteUser,
  ideaID: string,
  promptNames: PromptName[],
  feedback: API.Data.RunAndGetPromptResult.Req["feedback"],
  req: any
) => {
  const addJobToQueue = async (
    user: WhiteModels.Auth.WhiteUser,
    ideaID: string,
    promptName: PromptName,
    feedback: API.Data.RunAndGetPromptResult.Req["feedback"],
    req: any
  ) => {
    await openAIQueue
      .add({ user, ideaID, promptName, feedback, reqUUID: req.uuid })
      .then((job: any) => {
        job.finished().then(() => {
          promptNames.shift();
          if (promptNames[0] === "idea") promptNames.shift();
          if (promptNames.length > 0) {
            addJobToQueue(user, ideaID, promptNames[0], feedback, req);
          }
        });
      });
  };

  if (promptNames.length > 0) {
    await addJobToQueue(user, ideaID, promptNames[0], feedback, req);
  }
};

export default openAIQueue;
