# Step 2 — Importing Express (5 min)

Objective

- Add imports and create a minimal Express server file that will host GraphQL.

Steps

1. Create an entry file `server/app.js` with a minimal Express server:

```js
const express = require("express");

const app = express();

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
```

2. Run the new app in your console

```sh
$ node app
Server is listening on port 4000
```


