# Step 8 — Getting Customers, Themes, and FocusSessions (4 min)

## Objective

- Add top-level queries to fetch `Customer`, `Theme`, and `FocusSession` items from DynamoDB.

## Steps

1. In `server/graphql/schema/schema.js`, add `ScanCommand`, `QueryCommand`, and `GetCommand` to the existing `@aws-sdk/lib-dynamodb` import, and pull in `THEMES_TABLE`'s siblings you'll need for lookups (already imported from Step 7):

```js
const { PutCommand, ScanCommand, QueryCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
```

2. Replace the `customers` field's `resolve` on `RootQuery` with a `ScanCommand` — note `Scan` reads the whole table, which is fine for a lab but worth flagging as something to avoid at production scale:

```js
customers: {
  type: new GraphQLList(CustomerType),
  async resolve(parent, args) {
    const result = await docClient.send(new ScanCommand({ TableName: CUSTOMERS_TABLE }));
    return result.Items;
  }
},
```

3. Replace `themes` the same way, keeping the existing `color` filter argument by filtering the scanned items in JS:

```js
themes: {
  type: new GraphQLList(ThemeType),
  args: { color: { type: GraphQLString } },
  async resolve(parent, args) {
    const result = await docClient.send(new ScanCommand({ TableName: THEMES_TABLE }));
    if (args.color) return _.filter(result.Items, { color: args.color });
    return result.Items;
  }
},
```

4. Replace `focusSessions`, keeping the optional `customerId` argument: when it's provided, send a `QueryCommand` against the `customerId-index` GSI instead of a `Scan`, so only that customer's sessions come back:

```js
focusSessions: {
    type: new GraphQLList(FocusSessionType),
    args: { customerId: { type: GraphQLID } },
    async resolve(parent, args) {
        if (args.customerId) {
          const result = await docClient.send(new QueryCommand({
            TableName: FOCUS_SESSIONS_TABLE,
            IndexName: "customerId-index",
            KeyConditionExpression: "customerId = :customerId",
            ExpressionAttributeValues: { ":customerId": args.customerId },
          }));
          return result.Items;
        }
        const result = await docClient.send(new ScanCommand({ TableName: FOCUS_SESSIONS_TABLE }));
        return result.Items;
    }
},
```

5. Replace the single-item lookups (`customer(id)`, `focusSession(id)`, `theme(id)`) with a `GetCommand` each, which reads by primary key instead of scanning:

```js
customer: {
  type: CustomerType,
  args: { id: { type: GraphQLString } },
  async resolve(parent, args) {
    const result = await docClient.send(new GetCommand({ TableName: CUSTOMERS_TABLE, Key: { id: args.id } }));
    return result.Item;
  },
},
focusSession: {
  type: FocusSessionType,
  args: { id: { type: GraphQLString } },
  async resolve(parent, args) {
    const result = await docClient.send(new GetCommand({ TableName: FOCUS_SESSIONS_TABLE, Key: { id: args.id } }));
    return result.Item;
  },
},
theme: {
  type: ThemeType,
  args: { id: { type: GraphQLString } },
  async resolve(parent, args) {
    const result = await docClient.send(new GetCommand({ TableName: THEMES_TABLE, Key: { id: args.id } }));
    return result.Item;
  },
}
```

6. On `FocusSessionType`, replace the `theme` resolver field with a `GetCommand` lookup by `parent.themeId` — a direct key lookup, not a GSI query, since a session only ever has one theme:

```js
theme: { type: ThemeType,
    async resolve(parent, args) {
        if (!parent.themeId) return null;
        const result = await docClient.send(new GetCommand({ TableName: THEMES_TABLE, Key: { id: parent.themeId } }));
        return result.Item;
    }
},
```

Note: `FocusSessionType.customer`, and `CustomerType.focusSessions`/`lastTwoFocusSessions`, still read from the in-memory `data.js` arrays. They're out of scope for this step — leave them as-is for now (or convert them yourself as a stretch goal in the Challenge below).

## What to check

- Querying `customers`, `themes`, and `focusSessions` in GraphiQL returns the items created in Steps 6–7.
- Calling `focusSessions(customerId: "...")` returns only that customer's sessions, confirming the GSI query works.
- Querying a `focusSession`'s nested `theme` field resolves to the correct `Theme` item.

## Challenge

There are still a few using the old in-memory arrays. Fix those before proceeding to [Step 9](./step-9.md).