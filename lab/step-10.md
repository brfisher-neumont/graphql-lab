# Step 10 — Showing Customers Relationships (11 min)

Objective

- Implement resolvers so `Customer` returns related `posts` and `hobbies` when requested.

Steps

1. In `CustomerType` define:

```js
posts: {
  type: new GraphQLList(PostType),
  resolve(parent) { return posts.filter(p => p.customerId === parent.id); }
},
hobbies: {
  type: new GraphQLList(HobbyType),
  resolve(parent) { return hobbies.filter(h => h.customerId === parent.id); }
}
```

2. Ensure `posts` and `hobbies` are imported from your `server/data/sample.js` file.

3. Test nested queries in GraphiQL:

```graphql
{
  customer(id: "1") {
    id
    name
    posts {
      id
      title
    }
    hobbies {
      id
      title
    }
  }
}
```

What to check

- The customer query returns nested `posts` and `hobbies` arrays.
