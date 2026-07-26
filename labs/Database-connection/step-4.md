# Step 4 — Create a Customers Table (7 min)

Objective

- Define the `Customers` table with a partition key.

Outline

- Create the `Customers` table, either in the DynamoDB console or via a small setup script using `CreateTableCommand` from `@aws-sdk/client-dynamodb`.
- Use `id` (String) as the **partition key** — DynamoDB only requires you to declare the key attributes up front; every other attribute (`name`, `email`, etc.) can vary per item since there's no fixed schema.
- Since DynamoDB won't generate an `id` for you the way a relational auto-increment or Mongo's `_id` would, plan to generate one in code — install `uuid` and use `uuidv4()` when creating a new `Customer` item in a later step.
- Keep table names in one place (e.g. a `server/db/tableNames.js` constants file) so `Customers`, `Themes`, and `FocusSessions` aren't hardcoded as string literals across resolvers.

What to check

- The `Customers` table appears in the DynamoDB console with `id` as its partition key.
- Table status shows `ACTIVE` before moving on.

Challenge

Try adding a billing-mode choice (on-demand vs provisioned) consciously rather than accepting the default, and think about which makes sense for a low-traffic lab project, then proceed to [Step 5](./step-5.md).
