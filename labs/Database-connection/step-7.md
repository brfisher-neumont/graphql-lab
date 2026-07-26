# Step 7 — Save a Theme (2 min)

## Objective

- Add a mutation that writes a `Theme` item to DynamoDB.

## Steps

1. In `server/graphql/schema/schema.js`, import `THEMES_TABLE` alongside the other table name constants from Step 6:

```js
const { CUSTOMERS_TABLE, FOCUS_SESSIONS_TABLE, THEMES_TABLE } = require("../../db/tableNames");
```

2. Replace `createTheme`'s `resolve` following the same async `PutCommand` pattern used for `createCustomer`/`createFocusSession` in Step 6 — `Theme` doesn't reference a `Customer` or `FocusSession`, so the item only needs its own generated `id`:

```js
createTheme: {
  type: ThemeType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const theme = {
      id: uuidv4(),
      name: args.name,
      color: args.color,
    };
    await docClient.send(new PutCommand({ TableName: THEMES_TABLE, Item: theme }));
    return theme;
  },
},
```

3. Test it in GraphiQL, then link it in by passing the returned `id` as the `themeId` argument on a `createFocusSession` call:

```graphql
mutation {
  createTheme(name: "Focus", color: "Purple") {
    id
    name
    color
  }
}
```

```graphql
mutation {
  createFocusSession(
    name: "Evening Wind Down"
    startDateTime: "2026-07-26T20:00:00Z"
    duration: 30
    customerId: "<id from a createCustomer call in Step 6>"
    themeId: "<id from createTheme above>"
  ) {
    id
    name
  }
}
```

Note: as in Step 6, don't query the nested `theme` field on the `FocusSession` result yet — that resolver still reads from the in-memory `data.js` `themes` array until Step 8 rewires it.

## What to check

- `createTheme` returns the item you built, including its generated `id`.
- The item appears under "Explore table items" for `Themes` in the DynamoDB console.
- Using that `id` as `themeId` on a new `createFocusSession` mutation links the two correctly.

## Challenge

Try creating a `FocusSession` that references the `Theme` you just created, and confirm the link works end to end, then proceed to [Step 8](./step-8.md).
