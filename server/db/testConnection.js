require("dotenv/config");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("./dynamo");

docClient
  .send(new ListTablesCommand({}))
  .then((result) => console.log("Connected to DynamoDB. Tables:", result.TableNames))
  .catch((err) => console.error("Failed to connect to DynamoDB:", err));