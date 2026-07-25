# Step 12 — Posts Query (8 min)

Objective

- Add a top-level `posts` query with optional filtering and return sample data.

Steps

1. In `RootQuery` add:

```js
posts: {
  type: new GraphQLList(PostType),
  args: { userId: { type: GraphQLID } },
  resolve(parent, args) {
    if (args.userId) return posts.filter(p => p.userId === args.userId);
    return posts;
  }
}
```

2. Test queries in GraphiQL:

```graphql
{
  posts {
    id
    title
    content
  }
}

{
  posts(userId: "1") {
    id
    title
  }
}
```

What to check

- `posts` and filtered `posts(userId: ...)` return expected results.
