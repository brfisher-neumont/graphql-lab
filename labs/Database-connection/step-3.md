# Step 3 — Setting up Project to Connect to DynamoDB (18 min)

## Objective

- Install the AWS SDK, configure credentials, and connect the Express app to DynamoDB.

## Outline

- Install dependencies in `server/` using `npm install <name>` for each:
  - `@aws-sdk/client-dynamodb` — the low-level DynamoDB client.
  - `@aws-sdk/lib-dynamodb` — a `DynamoDBDocumentClient` wrapper that lets you work with plain JS objects instead of DynamoDB's raw attribute-value format.
  - `dotenv` — load AWS credentials from an untracked `.env` file instead of hardcoding them.
- In `.env`, store `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` from Step 2, plus a `LISTEN_PORT` for the Express server itself (e.g. `4000`).
- Add `.env` to `.gitignore` so credentials never get committed.
- In `server/db/dynamo.js` (new file), create and export a client:

```js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = DynamoDBDocumentClient.from(client);
```

- In `server/app.js`, require `dotenv/config` at the top (so `AWS_REGION`/`AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`/`LISTEN_PORT` are loaded before anything else runs) and import the document client from Step 3 so it initializes as soon as the server starts:

```js
require("dotenv/config");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const schema = require("./graphql/schema/schema");
const docClient = require("./db/dynamo");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const app = express();

app.all("/graphql", createHandler({ schema }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

const PORT = process.env.LISTEN_PORT;
```

- Read the port to listen on from `.env` via `process.env.LISTEN_PORT` — don't hardcode `4000` directly in `app.listen(...)`.
- Do a sanity check with a `ListTablesCommand` before the server starts accepting requests, so a bad region/credential fails loudly at boot instead of on the first GraphQL query. Gate `app.listen` on the check resolving successfully:

```js
docClient
  .send(new ListTablesCommand({}))
  .then((result) => {
    console.log("Connected to DynamoDB. Tables:", result.TableNames);
    app.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  })
  .catch((err) => console.error("Failed to connect to DynamoDB:", err));
```

## What to check

- Starting the server (`nodemon app`) logs `Connected to DynamoDB. Tables: [...]` (even an empty array) before it logs the "listening on port" message.
- No AWS credential/region errors on startup.
- `.env` is present locally but not tracked by git (`git status` shouldn't show it).

## Challenge

Try temporarily using an invalid access key to confirm the server logs a clear connection error and never calls `app.listen` — it should fail closed, not start up half-connected. Then restore the correct credentials and proceed to [Step 4](./step-4.md).
