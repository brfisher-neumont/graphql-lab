require("dotenv/config");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const schema = require("./graphql/schema/schema");
const docClient = require("./db/dynamo");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const cors = require("cors");

const app = express();
app.use(cors());

app.all("/graphql", createHandler({ schema }));

// make this run off of ruru

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

const PORT = process.env.LISTEN_PORT;

// Add the code to test the DynamoDB connection before starting the server
docClient
  .send(new ListTablesCommand({})).then((result) => {
    console.log("Connected to DynamoDB. Tables:", result.TableNames);
    app.listen(PORT, () => {
        console.log("Server is listening on port " + PORT);
    });
});
