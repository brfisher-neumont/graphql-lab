# Step 8 — Interacting with the GraphQL AppSync API - Retrieve Themes and Showing them (20 min)

## Objective

- Require sign-in with Cognito, then query the AppSync API from the Next.js app and render the signed-in designer's themes.

## Steps

1. Install Amplify's pre-built React login UI:

```bash
npm install @aws-amplify/ui-react
```

2. In `app/layout.tsx`, configure Amplify and wrap the app in `<Authenticator>` so no page renders until a user signs in — this is what makes `Designer` a real logged-in identity rather than a stored record:

```tsx
"use client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {({ signOut }) => (
            <>
              {children}
              <button onClick={signOut} className="m-4 underline">
                Sign out
              </button>
            </>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
```

3. In `app/page.tsx`, generate a typed data client directly from the `Schema` type exported by Step 6's `amplify/data/resource.ts` — Gen 2 infers full types from your backend definition, so there's no separate generated `queries.ts`/`API.ts` to import:

```tsx
"use client";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();
```

4. Fetch the themes on mount and store them in state — because of the `ownerDefinedIn("designerId")` rule from Step 6, this only ever returns the signed-in designer's own themes, with no extra filtering needed:

```tsx
export default function Home() {
  const [themes, setThemes] = useState<Schema["Theme"]["type"][]>([]);

  useEffect(() => {
    async function fetchThemes() {
      const { data } = await client.models.Theme.list();
      setThemes(data);
    }
    fetchThemes();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Themes</h1>
      <ul className="space-y-2">
        {themes.map((theme) => (
          <li key={theme.id} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.color ?? undefined }}
            />
            {theme.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

5. Reload `http://localhost:3000` and sign up (or sign in as the test user from Step 6's Challenge) through the Authenticator form.
6. Once signed in, create a few sample themes directly from the browser console (`client.models.Theme.create({ name: "Sunset", color: "#f97316" })`) — Gen 2's typed client works client-side, so you no longer need the AppSync console's Queries tab for this — then confirm they render in the list.
7. Sign out and sign up as a second test user, and confirm that user sees an empty theme list — proving `designerId` really is scoped per logged-in designer rather than shared.

## What to check

- The app shows a Cognito sign-up/sign-in form before any page content loads.
- `client.models.Theme.list()` returns only the themes created by the currently signed-in designer.
- Signing in as a different designer shows a different (initially empty) list.
- No TypeScript errors on `theme.color`/`theme.name` — `Schema["Theme"]["type"]` is inferred directly from the backend schema in Step 6, with no manual codegen step.

## Challenge

Sign out, sign back in as the first test user, and confirm their themes are still there — then add a loading state (shown while `fetchThemes` is in flight) so the page feels complete end to end.
