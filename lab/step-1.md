# Step 1 — Setting up our First GraphQL Project (8 min)

Objective

- Initialize a Node project and create the folder structure for the lab.

Prerequisites

- Node.js and npm installed.

Steps

1. From the project root run:

```bash
npm init -y
mkdir -p lab server src
```

2. Create an entry file for the server at `server/index.js` and a folder for GraphQL code `server/graphql`.

3. Add a start script in `package.json`:

```json
"scripts": {
  "start": "node server/index.js",
  "dev": "nodemon server/index.js"
}
```

4. Commit your initial setup (optional):

```bash
git init
git add .
git commit -m "chore: initial lab scaffolding"
```

What to check

- `package.json` exists and `server/index.js` file can be created.
