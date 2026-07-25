# Step 6 — The Resolve Method — Returning Data (10 min)

Objective

- Implement resolver functions to return in-memory sample data.

Steps

1. Create a file `server/data/sample.js` with sample arrays:

```js
module.exports = {
  users: [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ],
  hobbies: [{ id: "1", title: "Gardening", description: "Plant care" }],
  posts: [{ id: "1", title: "First Post", content: "Hello", userId: "1" }],
};
```

2. Update resolvers in `schema.js` to return sample data:

```js
const { users } = require('../data/sample');

resolve(parent, args) { return users.find(u => u.id === args.id); }
// and
resolve() { return users; }
```

3. Restart server and confirm queries return sample data in GraphiQL.

What to check

- `user(id: "1")` returns Alice and `users` returns both entries.
