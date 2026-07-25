# Step 13 — Hobbies Query (4 min)

Objective

- Add a top-level `hobbies` query and test list returns.

Steps

1. In `RootQuery` add:

```js
hobbies: {
  type: new GraphQLList(HobbyType),
  resolve() { return hobbies; }
}
```

2. Test in GraphiQL:

```graphql
{
  hobbies {
    id
    title
    description
  }
}
```

What to check

- `hobbies` returns the full list from `server/data/sample.js`.
