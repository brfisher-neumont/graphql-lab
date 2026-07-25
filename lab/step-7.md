# Step 7 — Adding a Hobby Type and RootQuery (8 min)

Objective

- Create a `Hobby` type and add hobby queries to the schema.

Steps

1. In `server/graphql/schema.js` add a `HobbyType`:

```js
const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
```

2. Add `hobbies` to `RootQuery` and return `require('../data/sample').hobbies`.

3. Test in GraphiQL:

```graphql
{
  hobbies {
    id
    title
  }
}
```

What to check

- `hobbies` returns the sample hobby list defined in `server/data/sample.js`.
