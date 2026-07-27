# Step 7 — Setting up the AWS-Exports Config File (4 min)

## Objective

- Wire up the generated `aws-exports.js` config so the app can talk to the Amplify backend.

## Steps

1. Confirm `amplify push` from Step 6 generated `amplify-app/aws-exports.js` — this file holds your AppSync endpoint and region, plus the Cognito user pool ID and web client ID the login form in Step 8 needs.
2. Amplify Gen 1 always generates `aws-exports.js` as plain JavaScript, even in a TypeScript project, so give it a type declaration to keep TypeScript happy:

```ts
// amplify-app/aws-exports.d.ts
declare module "../aws-exports" {
  const awsExports: Record<string, unknown>;
  export default awsExports;
}
```

3. In `amplify-app/app/layout.tsx` (or a small client component it renders), configure Amplify with that file before any page tries to query the API:

```tsx
"use client";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);
```

4. Since `Amplify.configure` needs to run in the browser, either mark the component `"use client"` as above, or call it once from a small client component imported at the top of `app/layout.tsx`.
5. Restart the dev server (`npm run dev`) so the new config is picked up.

## What to check

- `aws-exports.js` exists and exports `aws_appsync_graphqlEndpoint`, `aws_appsync_region`, `aws_appsync_authenticationType`, `aws_user_pools_id`, and `aws_user_pools_web_client_id`.
- No "Amplify has not been configured" errors in the browser console when the app loads.
- No TypeScript error on the `aws-exports` import now that `aws-exports.d.ts` declares its shape.

## Challenge

Temporarily rename `aws-exports.js` and confirm the app fails with a clear "module not found" error instead of silently connecting to nothing — then rename it back. Then proceed to [Step 8](./step-8.md).
