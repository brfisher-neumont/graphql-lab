# Step 1 — Setting up our First GraphQL Project (8 min)

Objective

- Initialize a Node project and install expressjs

**Note:** Expressjs is a robust framework for web applications that is lightweight. See more at [expressjs.com](expressjs.com)

Prerequisites

- Node.js and npm installed.

Steps

1. From the project root run:

```bash
npm init -y
mkdir server
cd server
npm install express
```

You should see it install 
```sh
added 67 packages, and audited 68 packages in 3s

26 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

and you can see express was installed as a dependency in `package.json`
```json
{
  "name": "graphql-project",
  "version": "1.0.0",
  "description": "A practice project for GraphQL",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "author": "Brent",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```
