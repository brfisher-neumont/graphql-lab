# Step 9 — Adding Relationships Between Types (5 min)

Objective

- Link `User`, `Post`, and `Hobby` types so nested queries can resolve related data.

Steps

1. Add a `posts` field to `UserType` that returns a `GraphQLList(PostType)` and resolves using `posts.filter(p => p.userId === parent.id)`.

2. Add an `author` field to `PostType` that resolves by finding the user with `id === parent.userId`.

3. Add a `hobbies` field to `UserType` that resolves by filtering the hobbies array by a `userId` field (or mapping via relations you define in sample data).

What to check

- Nested queries like `user { posts { title } }` return expected nested data.
