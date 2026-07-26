# Step 8 — Adding the Theme Type (9 min)

Objective

- Create a `Theme` type and attach it to `FocusSession` with a reference to its theme.


Steps

1. In `server/graphql/schema.js` add `ThemeType`:

```js
const ThemeType = new GraphQLObjectType({
  name: "Theme",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});
```

2. Add a `themeId` field (`GraphQLID`) to `FocusSessionType` so each focus session can reference a theme:

```js
themeId: { type: GraphQLID },
```

3. Add a `themes` field to `RootQuery` that returns a `GraphQLList(ThemeType)` and connects to `server/data/data.js`'s `themes` array.

**Note:** You'll need `GraphQLList` in the destructured `require("graphql")` import if it isn't there yet.

4. Optionally add a `theme(id: ID!)` single-theme query.

What to check

- `themes` returns the sample themes and each focus session includes `themeId` to later link to a `Theme`.

This is all fun, but we haven't described a relationship yet. We'll do that in our next lab!
