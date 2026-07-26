# Step 6 — The Resolve Method — Returning Data (10 min)

Objective

- Implement resolver functions to return in-memory sample data.

In step 5, the `customer` resolver just returned a hardcoded object — it didn't matter what `id` you asked for, you always got back "John Doe". That's fine for proving the schema works end to end, but it's not a real API: the resolver ignored its own `args` and had nowhere to look up real records.

Now that the schema shape is settled (we know a `Customer` has an `id`, `name`, and `photo`), the resolver needs to earn its keep — it should actually use `args.id` to find and return the right record, and `customers` should return every record instead of an empty list. That means giving the resolvers a real, if simple, data source to read from.

Steps

1. Create a file `server/data/data.js` with sample arrays:

```js
module.exports = {
  customers: [
    { id: "1", name: "Alice" , photo: "Alice.jpg"},
    { id: "2", name: "Bob" , photo: "photo.jpg"},
    { id: "3", name: "Charlie" , photo: "Charlie.jpg"},
    { id: "4", name: "David" , photo: "David.jpg"},
    { id: "5", name: "Eve" , photo: "Eve.jpg"},
    { id: "6", name: "Frank" , photo: "Frank.jpg"},
  ],

};
```

2. Install lodash to work with arrays, numbers, etc. easier. (See https://lodash.com/ for more details of usage.)

```sh
npm install lodash
```

2. Update resolvers in `schema.js` to return sample data:

```js
const customers = require("../../data/data").customers;

const _ = require("lodash");
...
      resolve(parent, args) {
        return _.find(customers, { id: args.id });
      },

```

3. Confirm queries return sample data in GraphiQL.

What to check

- `customer(id: "1")` returns Alice and `customer(id: "2")` returns Bob.

4. Homework, add some other type, and see how it works!
