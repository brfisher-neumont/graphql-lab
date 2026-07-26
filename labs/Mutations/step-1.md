# Step 1 — Introduction to Mutations (2 min)

Objective

- Understand what a `GraphQLObjectType` mutation is and how it differs from a query.

Everything you've built so far in the Getting Started lab is a **query** — a read. A client asks for data shaped a certain way, and a resolver hands it back. Nothing on the server changes as a result.

A **mutation** is the GraphQL convention for a write — creating, updating, or deleting data. Under the hood a mutation is just another `GraphQLObjectType`, structured exactly like `RootQuery`: a name, and a `fields` object where each field has a `type`, some `args`, and a `resolve` function. The only real difference is intent — a mutation's resolver is expected to change state (push to an array, write to a database, etc.) before it returns.

You wire it in alongside your existing query root when you build the schema:

```js
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

Steps

1. In `server/graphql/schema/schema.js`, add `GraphQLNonNull` to the destructured `require("graphql")` import — you'll need it in the next step to mark required mutation arguments:

```js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
```

2. Below `RootQuery`, sketch out an empty `Mutation` type so you have a place to add fields in the next steps:

```js
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // createCustomer, createFocusSession, and createTheme will go here
  },
});
```

3. Update the exported schema to register it:

```js
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
```

What to check

- The server still starts (`nodemon app`) and GraphiQL still loads with no errors, even though `Mutation` has no fields yet.
- In GraphiQL's docs panel, you should now see a `MUTATION` section alongside `QUERY` — currently empty.
