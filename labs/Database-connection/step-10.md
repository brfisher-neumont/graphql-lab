# Step 10 — Finish Adding NonNulls to Other fields (1 min)

Objective

- Finish applying `GraphQLNonNull` to the remaining required fields across the schema.

Outline

- Sweep the rest of the schema — any mutation args or table-backed fields not covered in Step 9 — and apply `GraphQLNonNull` wherever a value must always be present (e.g. reference fields like `customerId`/`themeId` on `createFocusSession`, and `id` fields returned on types).
- Double check `RootQuery` fields that take a required `id` argument (e.g. a single `customer(id)` lookup) also use `GraphQLNonNull`.

What to check

- Every mutation that cannot succeed without a given argument now rejects requests missing that argument, with a clear validation error.
- The full mutation/query suite from this lab (`createCustomer`, `createFocusSession`, `createTheme`, `customers`, `themes`, `focusSessions`) still runs successfully in GraphiQL end to end.

Challenge

This wraps up the Database Connection lab — try running through all three mutations and three queries once more end to end to confirm everything persists to and reads from DynamoDB correctly.
