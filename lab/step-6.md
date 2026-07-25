# Step 6 — The Resolve Method — Returning Data (10 min)

Objective

- Implement resolver functions to return in-memory sample data.

Steps

1. Create a file `server/data/sample.js` with sample arrays:

```js
module.exports = {
  customers: [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ],
  hobbies: [{ id: "1", title: "Gardening", description: "Plant care" }],
  posts: [{ id: "1", title: "First Post", content: "Hello", customerId: "1" }],
};
```

2. Update resolvers in `schema.js` to return sample data:

```js
const { customers } = require('../data/sample');

resolve(parent, args) { return customers.find(c => c.id === args.id); }
// and
resolve() { return customers; }
```

3. Restart server and confirm queries return sample data in GraphiQL.

What to check

- `customer(id: "1")` returns Alice and `customers` returns both entries.
