# Step 6 — Save a Customer & a FocusSession (14 min)

Objective

- Add mutations that write a `Customer` and a `FocusSession` item to DynamoDB.

Outline

- In `server/graphql/schema/schema.js`, require the DynamoDB document client from Step 3, the `PutCommand` from `@aws-sdk/lib-dynamodb`, `uuidv4` from `uuid`, and the table name constants from Step 4.
- Add a `createCustomer` mutation field: takes args like `name` and `email`, and in `resolve`, build an item with a generated `id: uuidv4()`, send a `PutCommand({ TableName: "Customers", Item: item })`, and return the item.
- Add a `createFocusSession` mutation field: takes args like `name`, `startDateTime`, `duration`, `customerId`, and `themeId`, and in `resolve`, build an item the same way and `PutCommand` it into `FocusSessions`.
- Note that `resolve` now returns a **Promise** (since sending a command is async) — make `resolve` an `async` function, `await docClient.send(...)`, and return the item you built (DynamoDB's `PutCommand` doesn't hand the item back to you, unlike a database that returns the saved row/document).
- Test both mutations in GraphiQL, using the `id` from the created `Customer` as the `customerId` for the `FocusSession`.

What to check

- `createCustomer` returns the item you built, including its generated `id`.
- `createFocusSession` returns an item referencing the `customerId` you passed in.
- The new items are visible under "Explore table items" in the DynamoDB console for `Customers` and `FocusSessions`.

Challenge

Try creating a second `Customer` and a `FocusSession` that references it, to confirm multiple items save correctly, then proceed to [Step 7](./step-7.md).
