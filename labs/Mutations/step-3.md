# Step 3 — Creating a FocusSession with Mutations (7 min)

Objective

- Add a `createFocusSession` field to `Mutation` that creates a new `FocusSession`.

Steps

1. In `server/graphql/schema/schema.js`, add `createFocusSession` alongside `createCustomer`:

```js
createFocusSession: {
  type: FocusSessionType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    startDateTime: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: GraphQLInt },
    themeId: { type: GraphQLID },
    customerId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    const focusSession = {
      id: String(focusSessions.length + 1),
      name: args.name,
      description: args.description,
      notes: args.notes,
      startDateTime: args.startDateTime,
      duration: args.duration,
      themeId: args.themeId,
      customerId: args.customerId,
    };
    focusSessions.push(focusSession);
    return focusSession;
  },
},
```

`customerId` is required — a focus session that doesn't belong to any customer doesn't fit the data model from the Getting Started lab. `themeId` stays optional, since a session could exist before a theme is picked for it.

2. Test the mutation in GraphiQL. Use an existing customer's `id` (e.g. `"1"` for Alice):

```graphql
mutation {
  createFocusSession(
    name: "Deep Work Block"
    startDateTime: "2026-07-25T09:00:00Z"
    duration: 45
    customerId: "1"
  ) {
    id
    name
    startDateTime
    duration
    customer {
      name
    }
  }
}
```

3. Confirm it worked by querying the customer's focus sessions:

```graphql
{
  customer(id: "1") {
    name
    focusSessions {
      id
      name
      startDateTime
    }
  }
}
```

What to check

- The mutation returns the new `FocusSession`, including the nested `customer` it belongs to.
- The new session shows up in `customer(id: "1").focusSessions`.
