# Step 4 — Creating and Understanding Schemas (11 min)

Objective

- Create GraphQL types and the root schema file, explaining `GraphQLObjectType` and `GraphQLSchema`.

Steps

1. Create `server/graphql/schema.js` and add a basic `User` type and a `RootQuery` placeholder:

```js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({}),
});

module.exports = new GraphQLSchema({ query: RootQuery });
```

2. Read about `GraphQLObjectType` and `GraphQLSchema` in the docs or inline comments.

What to check

- `server/graphql/schema.js` exports a `GraphQLSchema` with at least `UserType` defined.
