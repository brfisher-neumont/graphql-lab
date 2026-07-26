# Step 7 — Save a Theme (2 min)

Objective

- Add a mutation that writes a `Theme` item to DynamoDB.

Outline

- Add a `createTheme` mutation field: takes args like `name` and `color`, and in `resolve`, build an item with a generated `id: uuidv4()` and send a `PutCommand({ TableName: "Themes", Item: item })`.
- Follow the same async pattern used for `createCustomer`/`createFocusSession` in Step 6.
- `Theme` doesn't reference a `Customer` or `FocusSession` — it's created standalone, then linked in by passing its `id` as the `themeId` argument on a `createFocusSession` call.

What to check

- `createTheme` returns the item you built, including its generated `id`.
- The item appears under "Explore table items" for `Themes` in the DynamoDB console.
- Using that `id` as `themeId` on a new `createFocusSession` mutation links the two correctly.

Challenge

Try creating a `FocusSession` that references the `Theme` you just created, and confirm the link works end to end, then proceed to [Step 8](./step-8.md).
