# Step 2 — Creating a Customer with Mutations (12 min)

Objective

- Add a `createCustomer` field to the `Mutation` root type with a resolver that creates a new `Customer`.

Steps

1. Add the GraphQLNonNull type to the GraphQL types

```js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
```

2. In `server/graphql/schema/schema.js`, add a `createCustomer` field inside `Mutation`'s `fields`:

```js
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
      },
      resolve(parent, args) {
        const customer = {
          id: String(customers.length + 1),
          name: args.name,
          photo: args.photo,
        };
        customers.push(customer);
        return customer;
      },
    },
  },
});
```

Add the `Mutation` to the exports

```js
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

`name` is wrapped in `GraphQLNonNull` because a customer without a name doesn't make sense — GraphQL will reject the mutation before your resolver even runs if `name` is missing. `photo` stays optional.

The resolver builds a plain object, assigns it the next sequential `id`, pushes it onto the in-memory `customers` array (imported from `server/data/data.js`), and returns it so the mutation's response can include whatever fields the client asked for.

**Note:** Because `customers` is just an array kept in memory, anything you add here resets the next time the server restarts (e.g. via `nodemon`). That's fine for this lab — a real app would persist to a database instead.

3. Test the mutation in GraphiQL:

```graphql
mutation {
  createCustomer(name: "Grace", photo: "Grace.jpg") {
    id
    name
    photo
  }
}
```

4. Confirm it worked by querying for the new customer:

```graphql
{
  customer(id: "7") {
    id
    name
    photo
  }
}
```

What to check

- The mutation returns the new `Customer` with a generated `id`.
- A follow-up `customer(id: "7")` query (or whatever id was assigned) returns the same customer you just created.

# Learning Challenge

Now that you've seen how mutations are done, the next step will be to create a FocusSession with Mutations.
Take a few minutes to do it on your own, and then continue to [Step-3](./step-2.md).
