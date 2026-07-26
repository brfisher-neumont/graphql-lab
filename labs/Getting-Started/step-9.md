# Step 9 — Adding Relationships Between Types (5 min)

Objective

- Understand the conceptual relationships between `Customer`, `FocusSession`, and `Theme` to start mapping entities

So far, we've created 3 entities, but so far, they don't have a relationship. We need to add the relationships.

The **Customer** may have many **FocusSessions**. the same **Theme** may be used over multiple **FocusSessions**. There are no apparent relationships between **Themes** and **Customers**.

![alt text](image-6.png)

There are more formal entity diagrams that could be used here, but I'm using a simplified, if not exact cartoon to represent that one customer has zero or more (many) focus sessions and that one Theme has zero or more (many) focus sessions.

In the next step, we'll model it in our schema and practice data.