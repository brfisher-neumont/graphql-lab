# Step 11 — Customer Type Relationship to Hobby (6 min)

Objective

- Show resolver chaining and how a customer's hobbies are resolved from sample data.

Steps

1. Decide how hobbies relate to customers in your sample data. Two simple patterns:
   - Each `hobby` has a `customerId` property, or
   - A customer stores an array of `hobbyIds`.

2. Example resolver when `hobby.customerId` exists:

```js
hobbies: {
  type: new GraphQLList(HobbyType),
  resolve(parent) { return hobbies.filter(h => h.customerId === parent.id); }
}
```

3. If using `hobbyIds` on the customer, map ids to hobby items inside the resolver.

What to check

- Requesting `customer { hobbies { title } }` resolves correctly and demonstrates resolver chaining.
