# Step 5 — Setting up Amplify in Project (5 min)

## Objective

- Install the Amplify Gen 2 backend tooling and client library into the Next.js project.

## Steps

1. In `amplify-app/`, install the Gen 2 backend packages as dev dependencies, plus the frontend client library:

```bash
npm install --save-dev @aws-amplify/backend @aws-amplify/backend-cli typescript
npm install aws-amplify
```

**Note:** This can take a little while. Don't give up hope. Let it run!

When you are fin

2. Gen 2 has no `amplify configure` step — its CLI (`ampx`) reuses whatever AWS credentials your AWS CLI/SDK already resolve to. Confirm you have a working profile:

```bash
aws sts get-caller-identity
```

If that fails, run `aws configure` first and create (or select) an IAM user with the necessary permissions for this project, rather than using your root account.

3. Confirm the Gen 2 CLI is available:

```bash
npx ampx --version
```

## What to check

- `npx ampx --version` prints a version number with no errors.
- `aws sts get-caller-identity` resolves to an account and IAM user, not an error.
- `@aws-amplify/backend`, `@aws-amplify/backend-cli`, and `aws-amplify` appear in `amplify-app/package.json`.

## Challenge

Run `aws sts get-caller-identity` again and confirm the IAM user it returns is a dedicated user for this project rather than your root account. Then proceed to [Step 6](./step-6.md).
