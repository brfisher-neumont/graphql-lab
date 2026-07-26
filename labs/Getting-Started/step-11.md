# Step 11 — Themes Query (8 min)

Objective

- Enhance the top-level `themes` query with optional filtering and return sample data.

Steps

1. In `RootQuery`, update the `themes` field (added back in Step 8) to accept an optional `color` argument:

```js
themes: {
  type: new GraphQLList(ThemeType),
  args: { color: { type: GraphQLString } },
  resolve(parent, args) {
    if(args.color) return _.filter(themes, { color: args.color });
    else return themes;
  }
},
```

Unlike `FocusSession`, `Theme` has no foreign key of its own to filter on (recall from Step 9 there's no direct relationship between `Theme` and `Customer`) — so here we filter on one of `Theme`'s own fields instead.

2. Test queries in GraphiQL:

```graphql
{
  themes {
    id
    name
    color
  }
}

{
  themes(color: "Red") {
    id
    name
    color
  }
}
```

What to check

- `themes` and filtered `themes(color: "Red")` return expected results.

```json
{
  "data": {
    "themes": [
      {
        "id": "1",
        "name": "Theme 1",
        "color": "Red"
      }
    ]
  }
}
```
