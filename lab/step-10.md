# Step 10 — Showing Users Relationships (11 min)

Objective

- Implement resolvers so `User` returns related `posts` and `hobbies` when requested.

Steps

1. In `UserType` define:

```js
posts: {
  type: new GraphQLList(PostType),
  resolve(parent) { return posts.filter(p => p.userId === parent.id); }
},
hobbies: {
  type: new GraphQLList(HobbyType),
  resolve(parent) { return hobbies.filter(h => h.userId === parent.id); }
}
```

2. Ensure `posts` and `hobbies` are imported from your `server/data/sample.js` file.

3. Test nested queries in GraphiQL:

```graphql
{
  user(id: "1") {
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

- The user query returns nested `posts` and `hobbies` arrays.
