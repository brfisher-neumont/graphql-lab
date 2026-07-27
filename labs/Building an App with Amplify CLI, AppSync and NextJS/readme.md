# GraphQL Lab — Building an App with Amplify CLI, AppSync and NextJS — 8 Steps

This lab builds a Next.js frontend from scratch for a Designer, Theme & Playlist domain model — where the Designer is the real logged-in user (authenticated via Amazon Cognito), owning the Themes and Playlists they create, and a Theme can set a Playlist — and wires it up to an AWS Amplify/AppSync backend, from scaffolding the app through signing in and retrieving real data from the GraphQL API.  
Total time: ~57 min

1. [App Overview](step-1.md) — 6 min
	- Objective: Introduce the app we're building: a Next.js frontend for the `Designer`, `Theme`, and `Playlist` domain model, backed by AWS Amplify, AppSync, and Cognito.

2. [Creating the NextJS App](step-2.md) — 2 min
	- Objective: Scaffold a new Next.js application as the frontend for this lab.

3. [NextJS Hot Reload](step-3.md) — 2 min
	- Objective: Confirm Next.js's dev server hot-reloads the app on file changes.

4. [Setting up Styling with TailwindCSS](step-4.md) — 4 min
	- Objective: Confirm Tailwind CSS — already scaffolded by `create-next-app`'s recommended defaults in Step 2 — is working, and make a small customization.

5. [Setting up Amplify in Project](step-5.md) — 5 min
	- Objective: Install the Amplify Gen 2 backend tooling and client library into the Next.js project.

6. [Setting up our API with Amplify Gen 2](step-6.md) — 14 min
	- Objective: Define an Amplify Gen 2 backend — Cognito authentication and a Cognito-secured GraphQL API — as code, and deploy it with a personal cloud sandbox.

7. [Setting up the Amplify Outputs Config File](step-7.md) — 4 min
	- Objective: Wire up the generated `amplify_outputs.json` config so the app can talk to the Amplify backend.

8. [Interacting with the GraphQL AppSync API - Retrieve Themes and Showing them](step-8.md) — 20 min
	- Objective: Require sign-in with Cognito, then query the AppSync API from the Next.js app and render the signed-in designer's themes.
