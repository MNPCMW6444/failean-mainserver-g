FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts as BUILDER
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \ && unzip awscliv2.zip \ && sudo ./aws/install
RUN aws configure set region us-west-2
RUN pip install awscli-plugin-codeartifact
RUN npm config set @failean:registry ttps://failean-988253048728.d.codeartifact.us-east-1.amazonaws.com/npm/failean/
RUN aws codeartifact login --tool npm --repository failean --domain failean --domain-owner 988253048728 --region us-east-1
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.prod.json /app/tsconfig.prod.json
COPY build.ts /app/build.ts
COPY src /app/src
RUN npm run prod
RUN npm run clean:p
RUN npm i --omit=dev
RUN rm -rf .npmrc
FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts-slim
WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
CMD ["node", "./dist"]
EXPOSE 6555
