# Step 6 — Setting up our API with Amplify CLI - Amplify init (14 min)

## Objective

- Run `amplify init` to connect the project to an AWS Amplify backend, then add Cognito authentication and a Cognito-secured GraphQL API.

## Steps

1. From `amplify-app/`, initialize Amplify in the project:

```bash
amplify init
```

2. Answer the prompts:
   - Enter a name for the project (e.g. `amplifyapp`)
   - Initialize with the default editor? choose your editor
   - App type: **typescript**
   - Framework: **react** (Next.js uses the React settings)
   - Source directory path: `app`
   - Distribution directory path: `.next`
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Select the AWS profile you configured in [Step 5](./step-5.md)
3. Confirm Amplify created a local `amplify/` folder (backend config) and a cloud "amplify" environment — check the **AWS Amplify console** to see the new app listed.
4. Add Cognito authentication — this is what makes `Designer` a real logged-in user instead of a stored record:

```bash
amplify add auth
```

   - Do you want to use the default authentication and security configuration? **Default configuration**
   - How do you want users to be able to sign in? **Username**
   - Do you want to configure advanced settings? **No, I am done.**
5. Add a GraphQL API to the backend, secured by the Cognito user pool you just added:

```bash
amplify add api
```

   - Service: **GraphQL**
   - API name: e.g. `amplifyapp`
   - Authorization type: **Amazon Cognito User Pool**
   - Configure additional auth types? **No**
   - Choose **Blank Schema**, then edit the generated `amplify/backend/api/<name>/schema.graphql` to match the domain model from Step 1 — each type is owned by whichever Cognito user creates it, tracked in a `designerId` field:

```graphql
type Playlist @model @auth(rules: [{ allow: owner, ownerField: "designerId" }]) {
  id: ID!
  name: String!
}

type Theme @model @auth(rules: [{ allow: owner, ownerField: "designerId" }]) {
  id: ID!
  name: String!
  color: String
  playlistId: ID
}
```

`@auth(rules: [{ allow: owner, ownerField: "designerId" }])` tells AppSync to stamp each new item with the signed-in user's identity in `designerId`, and to only return items to the `Designer` who owns them — no separate `Designer` table needed.

6. Deploy the backend to AWS:

```bash
amplify push
```

Confirm the prompt to generate GraphQL statements — answer **Yes** so Amplify generates the typed `queries`/`mutations`/`subscriptions` code (plus an `API.ts` with generated TypeScript types) used in [Step 8](./step-8.md).

## What to check

- `amplify status` shows both `Auth` and `Api` resources in a `No Change` state after `push` completes successfully.
- The AWS AppSync console shows a new API matching the name you chose, using **Amazon Cognito User Pool** as its default authorization mode, with `Theme` and `Playlist` types in its schema.
- The Amazon Cognito console shows a new User Pool for this project.
- `amplify-app/graphql/` (or `src/graphql/`) now contains generated `queries.ts`, `mutations.ts`, and `subscriptions.ts` files, plus a generated `API.ts` with typed interfaces for `Theme` and `Playlist`.

## Challenge

In the Cognito console, create a test user directly (or via `amplify console auth`) before wiring real sign-up/sign-in into the frontend in Step 8. Then proceed to [Step 7](./step-7.md).
