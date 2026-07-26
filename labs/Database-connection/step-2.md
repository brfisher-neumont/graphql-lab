# Step 2 — Creating an AWS Account and Setting Up DynamoDB (7 min)

## Objective

- Create a free-tier AWS account, set up an IAM user with programmatic access, and locate the DynamoDB console.

## Outline

- Sign up for a free-tier account at [aws.amazon.com](aws.amazon.com), if you don't already have one.
- In the **IAM** console, create a new user for this project (don't use your root account credentials in the app). E.g. 'graphql-lab'.
  - Attach the `AmazonDynamoDBFullAccess` policy (or a scoped-down custom policy) for lab purposes.
  - Generate an **access key ID** and **secret access key** for programmatic access — these are what the app will authenticate with in Step 3. Choose 'Local code'
  - Click download .csv. We'll configure them later.
- Pick an AWS **region** to use consistently for this lab (e.g. `us-west-1`) — DynamoDB tables are region-scoped.
- Open the **DynamoDB** console and confirm you can see the (currently empty) tables list for your chosen region.

## What to check

- You have an access key ID and secret access key saved somewhere safe (you won't be able to view the secret again after closing the dialog).
- The IAM user has DynamoDB permissions attached.
- The DynamoDB console loads for your chosen region with no tables yet.

## Challenge

Try creating and deleting a throwaway table directly in the console to get familiar with the UI before wiring anything into the project. Then proceed to [Step 3](./step-3.md).
