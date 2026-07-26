# Step 3 — Setting up Project to Connect to DynamoDB (18 min)

Objective

- Install the AWS SDK, configure credentials, and connect the Express app to DynamoDB.

Outline

- Install dependencies in `server/`:
  - `@aws-sdk/client-dynamodb` — the low-level DynamoDB client.
  - `@aws-sdk/lib-dynamodb` — a `DynamoDBDocumentClient` wrapper that lets you work with plain JS objects instead of DynamoDB's raw attribute-value format.
  - `dotenv` — load AWS credentials from an untracked `.env` file instead of hardcoding them.
- In `.env`, store `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` from Step 2.
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

- In `server/app.js`, require `dotenv/config` at the top and import the document client to confirm it initializes without throwing.
- Do a quick sanity check with a `ListTablesCommand` (or the throwaway table from Step 2) to confirm the app can actually reach DynamoDB with these credentials.

What to check

- Starting the server (`nodemon app`) doesn't throw any AWS credential/region errors.
- A test `ListTablesCommand` call returns successfully (even if the list is still empty).
- `.env` is present locally but not tracked by git (`git status` shouldn't show it).

Challenge

Try temporarily using an invalid access key to confirm you get a clear authentication error, then restore the correct credentials and proceed to [Step 4](./step-4.md).
