# Step 5 — Adding a FocusSession Query (6 min)

## Objective

- Add a top-level `focusSessions` query so you can list every `FocusSession`, including the ones you've been creating with mutations.

`RootQuery` currently only has a singular `focusSession(id: ...)` field — there's no way to see everything at once, or to double-check that mutations from the last two steps actually landed in the data.

## Steps

1. In `server/graphql/schema/schema.js`, add a `focusSessions` field to `RootQuery`, alongside `focusSession`:

```js
focusSessions: {
  type: new GraphQLList(FocusSessionType),
  args: { customerId: { type: GraphQLID } },
  resolve(parent, args) {
    if (args.customerId) return _.filter(focusSessions, { customerId: args.customerId });
    return focusSessions;
  }
},
```

This mirrors the `themes` field's optional-filter pattern from Step 11 of the Getting Started lab: no `customerId` argument returns everything, an argument narrows the list.

2. Test in GraphiQL:

```graphql
{
  focusSessions {
    id
    name
    customerId
    themeId
  }
}
```

3. Filter down to a single customer's sessions:

```graphql
{
  focusSessions(customerId: "1") {
    id
    name
    startDateTime
  }
}
```

What to check

- `focusSessions` returns every session, including any you created via `createFocusSession` in Steps 3 and 4.
- `focusSessions(customerId: "1")` returns only Alice's sessions.

## Challenge
the next step will ask you to create queries for the other two entities that we have.