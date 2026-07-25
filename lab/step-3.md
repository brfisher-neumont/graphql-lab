# Step 3 — Install GraphQL and Express (10 min)

Objective

- Install runtime dependencies and add developer tooling.

Steps

1. Install packages:

```bash
npm install express graphql express-graphql
npm install --save-dev nodemon
```

2. Update `package.json` scripts (if not done in Step 1):

```json
"scripts": {
  "start": "node server/index.js",
  "dev": "nodemon server/index.js"
}
```

3. Run the server in dev mode to verify it starts (it will error until schema exists):

```bash
npm run dev
```

What to check

- `node_modules` contains `express` and `graphql` and `npm run dev` launches `server/index.js`.
