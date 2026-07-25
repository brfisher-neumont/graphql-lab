const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const schema = require("./graphql/schema/schema");

const app = express();

app.all("/graphql", createHandler({ schema }));

// make this run off of ruru

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});


app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
