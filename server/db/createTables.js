require("dotenv/config");
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { CUSTOMERS_TABLE, THEMES_TABLE, FOCUS_SESSIONS_TABLE } = require("./tableNames");

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

client
  .send(
    new CreateTableCommand({
      TableName: THEMES_TABLE,
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      BillingMode: "PAY_PER_REQUEST",
    })
  )
  .then(() => console.log(`${THEMES_TABLE} table created`))
  .catch((err) => console.error("Failed to create table:", err));

client
  .send(
    new CreateTableCommand({
      TableName: FOCUS_SESSIONS_TABLE,
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "customerId", AttributeType: "S" },
      ],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      GlobalSecondaryIndexes: [
        {
          IndexName: "customerId-index",
          KeySchema: [{ AttributeName: "customerId", KeyType: "HASH" }],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  )
  .then(() => console.log(`${FOCUS_SESSIONS_TABLE} table created`))
  .catch((err) => console.error("Failed to create table:", err));