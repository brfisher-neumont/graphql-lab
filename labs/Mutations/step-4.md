# Step 4 — Creating a Theme with Mutations (8 min)

Objective

- Add a `createTheme` field to `Mutation` that creates a new `Theme`.

Steps

1. In `server/graphql/schema/schema.js`, add `createTheme` alongside `createCustomer` and `createFocusSession`:

```js
createTheme: {
  type: ThemeType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLString },
  },
  resolve(parent, args) {
    const theme = {
      id: String(themes.length + 1),
      name: args.name,
      color: args.color,
    };
    themes.push(theme);
    return theme;
  },
},
```

2. Test the mutation in GraphiQL:

```graphql
mutation {
  createTheme(name: "Focus", color: "Purple") {
    id
    name
    color
  }
}
```

3. Now link it to a focus session. Using the `id` returned above (e.g. `"4"`), add a new focus session that references it as its `themeId`:

```graphql
mutation {
  createFocusSession(
    name: "Evening Wind Down"
    startDateTime: "2026-07-25T20:00:00Z"
    duration: 30
    customerId: "1"
    themeId: "4"
  ) {
    id
    name
    theme {
      name
      color
    }
  }
}
```

What to check

- `createTheme` returns the new `Theme` with a generated `id`.
- The follow-up `createFocusSession` mutation's nested `theme` field resolves to the theme you just created, confirming `themeId` links the two correctly.
