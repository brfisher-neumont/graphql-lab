# Step 5 — Create Theme and FocusSession Tables (3 min)

Objective

- Define the `Themes` table, and the `FocusSessions` table with a GSI for looking up sessions by `customerId`.

Outline

- Create the `Themes` table with `id` (String) as the partition key. `Theme` is standalone in this domain (created independently, then referenced by a `FocusSession`), so it doesn't need an owner reference or GSI.
- Create the `FocusSessions` table with `id` (String) as the partition key, plus two relationship attributes:
  - `customerId` — the owning `Customer`. Add a **Global Secondary Index** (e.g. `customerId-index`) with `customerId` as its partition key, so you can query "all focus sessions for this customer" — this is the same lookup the `focusSessions(customerId)` query from the Getting Started lab performs.
  - `themeId` — the linked `Theme`. Since a `FocusSession` only ever needs its *one* theme, this is looked up directly with a `GetCommand` by primary key in a later step, so it doesn't need its own GSI.
- Follow the same pattern used for `Customers` in Step 4 so all three tables are consistent (naming, key types, region).

What to check

- The `Themes` table shows `ACTIVE` status with `id` as its primary partition key.
- The `FocusSessions` table shows `ACTIVE` status with `id` as its primary partition key, and its `customerId-index` GSI shows `ACTIVE` with `customerId` as its partition key.

Challenge

Try running a manual `QueryCommand` against the `customerId-index` directly in the console's "Explore table items" view (with a made-up `customerId`) to confirm the index is queryable, then proceed to [Step 6](./step-6.md).
