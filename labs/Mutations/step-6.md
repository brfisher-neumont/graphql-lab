# Step 6 — Customers Query (5 min)

## Objective

- Create a `customers` query so we can verify all the customers in the system.

## Steps

1. add to the `RootQuery` the `customers` block

```js
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers;
      }
    },
```

2. Try it out in GraphiQL:

```graphql
{
  customers {
    id
    name
    photo
  }
}
```

3. Create a new customer with `createCustomer` (Step 2), then re-run the `customers` query to confirm it shows up in the list:

```graphql
mutation {
  createCustomer(name: "Ivan", photo: "Ivan.jpg") {
    id
  }
}
```

What to check

- `customers` returns every customer from `server/data/data.js`, including any you've created via `createCustomer` in this or earlier steps.

