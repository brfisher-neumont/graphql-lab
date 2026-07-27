# Step 7 — Setting up the Amplify Outputs Config File (4 min)

## Objective

- Wire up the generated `amplify_outputs.json` config so the app can talk to the Amplify backend.

## Steps

1. Confirm `npx ampx sandbox` from Step 6 generated `amplify-app/amplify_outputs.json` — this file holds your AppSync endpoint, region, and Cognito user pool/client IDs the login form in Step 8 needs. Unlike Gen 1's `aws-exports.js`, it's plain JSON, so TypeScript can import it with no type shim.
2. In `amplify-app/app/layout.tsx` (or a small client component it renders), configure Amplify with that file before any page tries to query the API:

```tsx
"use client";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);
```

3. Since `Amplify.configure` needs to run in the browser, either mark the component `"use client"` as above, or call it once from a small client component imported at the top of `app/layout.tsx`.
4. Confirm `amplify-app/tsconfig.json` has `"resolveJsonModule": true` (Next.js's default `tsconfig.json` already includes this) so the JSON import type-checks.
5. Leave `npx ampx sandbox` running from Step 6, and restart the dev server (`npm run dev`) so the new config is picked up.

## What to check

- `amplify_outputs.json` exists at the project root and contains an `auth` block (with `user_pool_id`, `user_pool_client_id`) and a `data` block (with `url`, `region`, `default_authorization_type`).
- No "Amplify has not been configured" errors in the browser console when the app loads.
- No TypeScript error importing `amplify_outputs.json` directly.

## Challenge

Temporarily rename `amplify_outputs.json` and confirm the app fails with a clear "module not found" error instead of silently connecting to nothing — then rename it back and confirm `npx ampx sandbox` (still running from Step 6) regenerates it if it ever goes missing. Then proceed to [Step 8](./step-8.md).
