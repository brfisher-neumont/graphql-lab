const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello, world!",
      },
    },
  }),
});

app.all("/graphql", createHandler({ schema }));

// make this run off of ruru

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.get("/new", (_req, res) => {
  res.type("text");
  res.end("I'm new!");
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
