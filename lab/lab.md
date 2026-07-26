# GraphQL Lab — 13 Steps

This lab walks through building a small GraphQL API with Express in 13 focused steps. Each step includes an estimated time and a short objective.

1. Setting up our First GraphQL Project — 8 min
	- Objective: Initialize the project, create basic folder structure, and add starter files.

2. Importing Express and GraphQL — 5 min
	- Objective: Add imports and set up a minimal Express server to host GraphQL.

3. Install GraphQL and Express — 10 min
	- Objective: Install `express`, `graphql`, and any helper packages; verify package.json.

4. Creating and Understanding Schemas — 11 min
	- Objective: Design GraphQL types and the schema; explain `GraphQLObjectType` and `GraphQLSchema`.

5. The RootQuery and Running Queries on GraphQL — 16 min
	- Objective: Implement `RootQuery` to expose basic read endpoints and run sample queries.

6. The Resolve Method — Returning Data — 10 min
	- Objective: Write resolver functions to fetch and return data for fields on types.

7. Adding a Hobby Type and RootQuery — 8 min
	- Objective: Create a `Hobby` type and add it to the `RootQuery` so hobbies can be queried.

8. Adding the Post Type — 9 min
	- Objective: Create a `Post` type with fields (id, title, content, author) and add to schema.

9. Adding Relationships Between Types — 5 min
	- Objective: Link types (e.g., `Customer` ↔ `Post`, `Customer` ↔ `Hobby`) and expose nested fields.

10. Showing Customers Relationships — 11 min
	 - Objective: Implement customer resolvers that return related focusSessions and themes.

11. Posts Query — 8 min
	 - Objective: Add a top-level `posts` query, support filtering and return sample data.

12. Hobbies Query — 4 min
	 - Objective: Add a top-level `hobbies` query and test queries that return lists.

---

Optional next steps:
- Add mutations (create/update/delete)
- Connect to a real database (MongoDB, Postgres)
- Add input validation and error handling
