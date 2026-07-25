# Step 2 — Importing Express and GraphQL (5 min)

Objective

- Add imports and create a minimal Express server file that will host GraphQL.

Steps




1. Create an entry file `server/index.js` with a minimal Express server:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('GraphQL lab server'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```



2. Open `server/index.js` and add the following skeleton:

```js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema"); // create in later steps

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

2. Save the file. The server will not run yet until dependencies and the `schema` file exist — that's covered in later steps.

What to check

- `server/index.js` contains the `express` and `express-graphql` setup and references `./graphql/schema`.
