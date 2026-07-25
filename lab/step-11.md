# Step 11 — User Type Relationship to Hobby (6 min)

Objective

- Show resolver chaining and how a user's hobbies are resolved from sample data.

Steps

1. Decide how hobbies relate to users in your sample data. Two simple patterns:
   - Each `hobby` has a `userId` property, or
   - A user stores an array of `hobbyIds`.

2. Example resolver when `hobby.userId` exists:

```js
hobbies: {
  type: new GraphQLList(HobbyType),
  resolve(parent) { return hobbies.filter(h => h.userId === parent.id); }
}
```

3. If using `hobbyIds` on the user, map ids to hobby items inside the resolver.

What to check

- Requesting `user { hobbies { title } }` resolves correctly and demonstrates resolver chaining.
