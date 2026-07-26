# GraphQL Lab — Database Connection — 10 Steps

This lab moves off the in-memory sample data used in the earlier labs and connects the GraphQL API to a real DynamoDB database via the AWS SDK. It re-implements the `Customer`, `FocusSession`, and `Theme` entities from the Getting Started and Mutations labs as DynamoDB tables, and wires up validation with `GraphQLNonNull`. Each step includes an estimated time and a short objective. Total time: ~72 min

1. [DynamoDB vs Relational Databases](step-1.md) — 9 min
	- Objective: Understand how DynamoDB's key-value/document model differs from a relational database, and why that shapes how we design the `Customers`, `Themes`, and `FocusSessions` tables.

2. [Creating an AWS Account and Setting Up DynamoDB](step-2.md) — 7 min
	- Objective: Create a free-tier AWS account, set up an IAM user with programmatic access, and locate the DynamoDB console.

3. [Setting up Project to Connect to DynamoDB](step-3.md) — 18 min
	- Objective: Install the AWS SDK, configure credentials, and connect the Express app to DynamoDB.

4. [Create a Customers Table](step-4.md) — 7 min
	- Objective: Define the `Customers` table with a partition key.

5. [Create Theme and FocusSession Tables](step-5.md) — 3 min
	- Objective: Define the `Themes` table, and the `FocusSessions` table with a GSI for looking up sessions by `customerId`.

6. [Save a Customer & a FocusSession](step-6.md) — 14 min
	- Objective: Add mutations that write a `Customer` and a `FocusSession` item to DynamoDB.

7. [Save a Theme](step-7.md) — 2 min
	- Objective: Add a mutation that writes a `Theme` item to DynamoDB.

8. [Getting Customers, Themes, and FocusSessions](step-8.md) — 4 min
	- Objective: Add top-level queries to fetch `Customer`, `Theme`, and `FocusSession` items from DynamoDB.

9. [Cors and Adding NonNulls to Required Fields](step-9.md) — 7 min
	- Objective: Enable CORS on the Express app and mark required mutation arguments with `GraphQLNonNull`.

10. [Finish Adding NonNulls to Other fields](step-10.md) — 1 min
	- Objective: Finish applying `GraphQLNonNull` to the remaining required fields across the schema.
