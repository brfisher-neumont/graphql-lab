# GraphQL Lab — 12 Steps

This lab walks through building a small GraphQL API with Express in 12 focused steps. Each step includes an estimated time and a short objective. Total time: ~ 2 hours

1. [Setting up our First GraphQL Project](step-1.md) — 8 min
	- Objective: Initialize a Node project and install expressjs.

2. [Importing Express](step-2.md) — 5 min
	- Objective: Add imports and create a minimal Express server file that will host GraphQL.

3. [Install GraphQL, GraphQL-HTTP, and ruru](step-3.md) — 10 min
	- Objective: Install GraphQL, GraphQL-HTTP and a GraphiQL-style UI (ruru).

4. [Creating and Understanding Schemas](step-4.md) — 11 min
	- Objective: Create GraphQL types and the root schema file, explaining `GraphQLObjectType` and `GraphQLSchema`.

5. [The RootQuery and Running Queries on GraphQL](step-5.md) — 16 min
	- Objective: Implement `RootQuery` fields and enable GraphiQL to run queries.

6. [The Resolve Method — Returning Data](step-6.md) — 10 min
	- Objective: Implement resolver functions to return in-memory sample data.

7. [Adding a FocusSession Type and RootQuery](step-7.md) — 8 min
	- Objective: Create a `FocusSession` type and add focus session queries to the schema.

8. [Adding the Theme Type](step-8.md) — 9 min
	- Objective: Create a `Theme` type and attach it to `FocusSession` with a reference to its theme.

9. [Adding Relationships Between Types](step-9.md) — 5 min
	- Objective: Understand the conceptual relationships between `Customer`, `FocusSession`, and `Theme` to start mapping entities.

10. [Showing Customer, FocusSession, and Theme Relationships](step-10.md) — 11 min
	- Objective: Implement resolvers so `Customer` returns related `FocusSessions`, and each `FocusSession` returns its related `Theme`.

11. [Themes Query](step-11.md) — 8 min
	- Objective: Enhance the top-level `themes` query with optional filtering and return sample data.

12. [Latest Focus Sessions Query](step-12.md) — 4 min
	- Objective: Find the latest 2 focus sessions for a customer, using sorting and pagination args.

---

Optional next steps:
- Add mutations (create/update/delete)
- Connect to a real database (MongoDB, Postgres)
- Add input validation and error handling
