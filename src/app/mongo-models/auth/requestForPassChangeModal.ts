import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
type WhiteRequestForPassChange = WhiteModels.Auth.WhiteRequestForPassChange;

const requestForPassChangeModal = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteRequestForPassChange>(
  "requestForPassChange",
  requestForPassChangeModal
);
