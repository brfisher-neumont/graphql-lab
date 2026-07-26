# Step 8 — Getting Customers, Themes, and FocusSessions (4 min)

Objective

- Add top-level queries to fetch `Customer`, `Theme`, and `FocusSession` items from DynamoDB.

Outline

- Add `customers`, `themes`, and `focusSessions` fields to `RootQuery`, each returning a `GraphQLList` of the corresponding type.
- In each `resolve`, send a `ScanCommand({ TableName: ... })` via the document client and return `Items` from the result — note that `Scan` reads the whole table, which is fine for a lab but worth calling out as something you'd avoid at production scale.
- On `focusSessions`, keep the optional `customerId` argument from the Getting Started lab: when it's provided, send a `QueryCommand` against the `customerId-index` GSI instead of a `Scan`, so only that customer's sessions come back.
- Optionally add single-item lookups (`customer(id: ID)`, `theme(id: ID)`) using a `GetCommand({ TableName: ..., Key: { id: args.id } })`.
- On `FocusSessionType`, add a `theme` resolver field that sends a `GetCommand({ TableName: "Themes", Key: { id: parent.themeId } })` to resolve the linked `Theme` — a direct key lookup, not a GSI query, since a session only ever has one theme.

What to check

- Querying `customers`, `themes`, and `focusSessions` in GraphiQL returns the items created in Steps 6–7.
- Calling `focusSessions(customerId: "...")` returns only that customer's sessions, confirming the GSI query works.
- Querying a `focusSession`'s nested `theme` field resolves to the correct `Theme` item.

Challenge

Try comparing the cost/performance difference between `Scan` (used for the unfiltered top-level lists) and `Query`/`GetCommand` (used for the filtered/nested lookups) as your data grows, then proceed to [Step 9](./step-9.md).
