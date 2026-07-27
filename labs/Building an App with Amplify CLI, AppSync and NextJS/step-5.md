# Step 5 — Setting up Amplify in Project (5 min)

## Objective

- Install the Amplify libraries and CLI into the Next.js project.

## Steps

1. Install the Amplify CLI globally, if you haven't already:

```bash
npm install -g @aws-amplify/cli
```

2. Configure the CLI with an IAM user Amplify can use to provision AWS resources on your behalf:

```bash
amplify configure
```

Follow the prompts to sign in to the AWS console, create (or select) an IAM user with the necessary permissions, and paste in its access key ID and secret access key.

3. In `amplify-app/`, install the Amplify client libraries the frontend will use to talk to the backend:

```bash
npm install aws-amplify
```

4. Confirm the CLI is installed and configured:

```bash
amplify --version
```

## What to check

- `amplify --version` prints a version number with no configuration errors.
- `aws-amplify` appears in `amplify-app/package.json`'s dependencies.

## Challenge

Run `amplify configure` again and inspect the IAM user it created in the AWS console — confirm it's a dedicated user for this project rather than your root account. Then proceed to [Step 6](./step-6.md).
