# Step 1 — DynamoDB vs Relational Databases (9 min)

Objective

- Understand how DynamoDB's key-value/document model differs from a relational database, and why that shapes how we design the `Customers`, `Themes`, and `FocusSessions` tables.

Outline

- Relational (SQL) databases: fixed tables, rows, columns, and a schema enforced by the database itself. Relationships are modeled with foreign keys and joins.
- DynamoDB is a **key-value/document database**: data is stored as items (JSON-like) in a table, and only the primary key needs to be consistent across items — every other attribute is flexible per item.
- Introduce the core primary key concepts:
  - **Partition key** — determines which physical partition an item lives on; used for fast direct lookups.
  - **Sort key** (optional) — combined with a partition key to allow multiple related items under the same partition, sorted and range-queryable.
  - **Global Secondary Index (GSI)** — lets you query by an attribute other than the primary key (e.g. looking up `FocusSessions` by `customerId`).
- Compare how the same data looks in each model:
  - Relational: separate `customers`, `themes`, and `focus_sessions` tables joined by foreign keys (`customer_id`, `theme_id`).
  - DynamoDB: separate `Customers`, `Themes`, and `FocusSessions` tables. `FocusSessions` items carry a `customerId` (looked up via a GSI) and a `themeId` (looked up directly by primary key), the same relationships already used in the Getting Started and Mutations labs.
- Discuss DynamoDB's **no joins** rule — you either denormalize (duplicate data across items) or issue a second query using a GSI or a direct key lookup, which is the approach this lab takes.
- Note that DynamoDB has no fixed schema to enforce field types the way a relational database (or Mongoose) would — that's why later steps lean on GraphQL's `GraphQLNonNull` to validate required fields at the API layer instead.

What to check

- Can explain, in your own words, the difference between a DynamoDB table/item and a SQL table/row.
- Can explain what a partition key, sort key, and GSI are each used for.

Challenge

Try sketching what the `Customer`, `Theme`, and `FocusSession` items will look like (attributes + which references need a GSI vs. a direct key lookup) before moving on, then proceed to [Step 2](./step-2.md).
