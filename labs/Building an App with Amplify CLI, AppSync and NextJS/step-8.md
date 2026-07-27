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
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

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

3. In `app/page.tsx`, import the generated `listThemes` query and its typed result from Step 6, along with the Amplify API client:

```tsx
"use client";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listThemes } from "../graphql/queries";
import type { ListThemesQuery, Theme } from "../API";

const client = generateClient();
```

4. Fetch the themes on mount and store them in state — because of the `@auth(rules: [{ allow: owner, ownerField: "designerId" }])` rule from Step 6, this only ever returns the signed-in designer's own themes, with no extra filtering needed:

```tsx
export default function Home() {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    async function fetchThemes() {
      const result = await client.graphql<ListThemesQuery>({ query: listThemes });
      const items = result.data?.listThemes?.items ?? [];
      setThemes(items.filter((theme): theme is Theme => theme !== null));
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
6. Once signed in, run a few `createTheme` mutations (in the AppSync console's Queries tab, while signed in as that same Cognito user) to add sample `Theme`s, then confirm they render in the list.
7. Sign out and sign up as a second test user, and confirm that user sees an empty theme list — proving `designerId` really is scoped per logged-in designer rather than shared.

## What to check

- The app shows a Cognito sign-up/sign-in form before any page content loads.
- `listThemes` returns only the themes created by the currently signed-in designer.
- Signing in as a different designer shows a different (initially empty) list.
- No TypeScript errors on `theme.color`/`theme.name` — the generated `Theme` type from `API.ts` should match the fields used here.

## Challenge

Sign out, sign back in as the first test user, and confirm their themes are still there — then add a loading state (shown while `fetchThemes` is in flight) so the page feels complete end to end.
