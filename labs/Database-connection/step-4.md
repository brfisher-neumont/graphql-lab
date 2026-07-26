# Step 4 — Create a Customers Table (7 min)

Objective

- Define the `Customers` table with a partition key.

Steps

1. Install `uuid` in `server/` — DynamoDB won't generate an `id` for you the way a relational auto-increment or Mongo's `_id` would, so you'll generate one in code with `uuidv4()` starting in Step 6:

```bash
npm install uuid
```

2. Create `server/db/tableNames.js` to hold every table name in one place, so `Customers`, `Themes`, and `FocusSessions` aren't hardcoded as string literals across resolvers:

```js
module.exports = {
  CUSTOMERS_TABLE: "Customers",
  THEMES_TABLE: "Themes",
  FOCUS_SESSIONS_TABLE: "FocusSessions",
};
```

3. Create the `Customers` table using `id` (String) as the **partition key** — DynamoDB only requires you to declare the key attributes up front; every other attribute (`name`, `email`, etc.) can vary per item since there's no fixed schema. Either create it directly in the DynamoDB console, or with a small script using `CreateTableCommand`:

```js
require("dotenv/config");
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { CUSTOMERS_TABLE } = require("./tableNames");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

client
  .send(
    new CreateTableCommand({
      TableName: CUSTOMERS_TABLE,
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      BillingMode: "PAY_PER_REQUEST",
    })
  )
  .then(() => console.log(`${CUSTOMERS_TABLE} table created`))
  .catch((err) => console.error("Failed to create table:", err));
```

4. Run the script once (e.g. `node server/db/createTables.js` if you saved it there), then confirm the table in the DynamoDB console.

```sh
node .\db\createTables.js
Debugger listening on ws://127.0.0.1:62947/12da895c-8c98-439c-8770-872473684fbb
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
Customers table created
Waiting for the debugger to disconnect...
```

What to check

- The `Customers` table appears in the DynamoDB console with `id` as its partition key.
- Table status shows `ACTIVE` before moving on.
