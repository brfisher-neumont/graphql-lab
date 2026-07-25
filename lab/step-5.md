# Step 5 — The RootQuery and Running Queries on GraphQL (16 min)

Objective

- Implement `RootQuery` fields and enable GraphiQL to run queries.

Steps

1. Update `server/graphql/schema.js` to export `RootQuery` fields (example `user` and `users`):

```js
const { GraphQLObjectType, GraphQLList, GraphQLID } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return null;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return [];
      },
    },
  }),
});
```

2. Start the server (`npm run dev`) and open `http://localhost:4000/graphql` to use GraphiQL.

3. Run sample queries like:

```graphql
{
  users {
    id
    name
  }
}
```

What to check

- GraphiQL loads and you can execute the `users` query (returns empty list initially).
