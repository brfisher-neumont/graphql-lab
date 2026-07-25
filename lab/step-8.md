# Step 8 — Adding the Post Type (9 min)

Objective

- Create a `Post` type and include it in the schema with a reference to its author.

Steps

1. In `server/graphql/schema.js` add `PostType`:

```js
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
  }),
});
```

2. Add a `posts` field to `RootQuery` that returns a `GraphQLList(PostType)` and connects to `server/data/sample.js`'s `posts` array.

3. Optionally add a `post(id: ID!)` single-post query.

What to check

- `posts` returns the sample posts and each post includes `userId` to later link to a `User`.
