# Step 9 — Cors and Adding NonNulls to Required Fields (7 min)

Objective

- Enable CORS on the Express app and mark required mutation arguments with `GraphQLNonNull`.

Outline

- Install `cors` in `server/` and add `app.use(cors())` in `app.js` before the GraphQL middleware, so a browser-based client on a different origin can call the API.
- Review each mutation added in Steps 6–7 (`createCustomer`, `createFocusSession`, `createTheme`) and decide which args are truly required (e.g. `name`/`email` for `Customer`, `name`/`customerId`/`themeId` for `FocusSession`).
- Wrap those required args' `type` in `GraphQLNonNull` (e.g. `type: new GraphQLNonNull(GraphQLString)`), matching the pattern already used in the Mutations lab.
- Re-test each mutation in GraphiQL, both with all required fields present and with one omitted, to confirm GraphQL now rejects incomplete requests before the resolver runs.

What to check

- A request from a different origin (or GraphiQL's network tab) shows the CORS headers are present.
- Omitting a required argument now returns a GraphQL validation error instead of reaching the resolver.
- Existing valid mutations from earlier steps still succeed unchanged.

Challenge

Try identifying which args you intentionally left optional and why, then proceed to [Step 10](./step-10.md).
