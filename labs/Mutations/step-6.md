# Step 6 — FocusSession and Theme Queries (5 min)

Objective

- Query `FocusSession`s and `Theme`s together in a single request, to verify end-to-end that the mutations from Steps 2–4 are wired up correctly.

This step doesn't add new schema — it's a checkpoint. You'll run one query that touches every mutation you've built so far: customers, focus sessions, and themes, plus the relationships between them from the Getting Started lab.

Steps

1. In GraphiQL, run a combined query requesting `themes` and `focusSessions` side by side:

```graphql
{
  themes {
    id
    name
    color
  }
  focusSessions {
    id
    name
    startDateTime
    theme {
      name
      color
    }
    customer {
      name
    }
  }
}
```

2. Cross-check the output against what you created:
   - Every `Theme` you created with `createTheme` (Step 4) should appear in the `themes` list.
   - Every `FocusSession` you created with `createFocusSession` (Steps 3–4) should appear in the `focusSessions` list, with its nested `theme` and `customer` resolving to the right records.

3. As a final check, create one more customer and immediately query their (empty) focus session list, to confirm new customers start with no sessions until one is created for them:

```graphql
mutation {
  createCustomer(name: "Heidi") {
    id
    name
  }
}
```

```graphql
{
  customer(id: "8") {
    name
    focusSessions {
      id
    }
  }
}
```

What to check

- The combined `themes` + `focusSessions` query returns consistent, correctly linked data for everything created across Steps 2–5.
- A freshly created customer has an empty `focusSessions` array until a session is created for them.
