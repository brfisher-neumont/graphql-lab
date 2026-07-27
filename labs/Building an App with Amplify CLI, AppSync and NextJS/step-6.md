# Step 6 — Setting up our API with Amplify Gen 2 (14 min)

## Objective

- Define an Amplify Gen 2 backend — Cognito authentication and a Cognito-secured GraphQL API — as code, and deploy it with a personal cloud sandbox.

## Steps

1. From `amplify-app/`, scaffold the Gen 2 backend:

```bash
npm create amplify@latest
```

This adds an `amplify/` directory already wired together: `amplify/auth/resource.ts`, `amplify/data/resource.ts`, and `amplify/backend.ts`.

2. In `amplify/auth/resource.ts`, confirm how users sign in — this is what makes `Designer` a real logged-in user instead of a stored record:

```ts
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
```

3. In `amplify/data/resource.ts`, replace the sample schema with the domain model from Step 1. Each type gets an explicit `designerId` field, tied to the signed-in Cognito user with `allow.ownerDefinedIn(...)`:

```ts
import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  Playlist: a
    .model({
      name: a.string().required(),
      designerId: a.string(),
    })
    .authorization((allow) => [allow.ownerDefinedIn("designerId")]),

  Theme: a
    .model({
      name: a.string().required(),
      color: a.string(),
      playlistId: a.id(),
      designerId: a.string(),
    })
    .authorization((allow) => [allow.ownerDefinedIn("designerId")]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
```

`allow.ownerDefinedIn("designerId")` tells AppSync to stamp each new item with the signed-in user's identity in `designerId`, and to only return items to the `Designer` who owns them — no separate `Designer` table needed.

4. In `amplify/backend.ts`, confirm both resources are registered together:

```ts
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

defineBackend({
  auth,
  data,
});
```

5. Deploy a personal cloud sandbox so you can develop against a real backend without affecting anyone else's:

```bash
npx ampx sandbox
```

Leave this running in its own terminal — it watches `amplify/` for changes and redeploys automatically, and writes `amplify_outputs.json` to the project root once the first deploy finishes. That file is what [Step 7](./step-7.md) wires into the frontend.

## What to check

- `npx ampx sandbox` completes its first deploy and keeps watching for changes, with no errors.
- The AWS AppSync console shows a new API using **Amazon Cognito User Pool** as its default authorization mode, with `Theme` and `Playlist` types in its schema.
- The Amazon Cognito console shows a new User Pool for this project.
- `amplify-app/amplify_outputs.json` now exists at the project root.

## Challenge

In the Cognito console, create a test user directly before wiring real sign-up/sign-in into the frontend in Step 8. Then proceed to [Step 7](./step-7.md).
