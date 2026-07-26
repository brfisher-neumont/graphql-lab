# Step 12 — Latest Focus Sessions Query (4 min)

Objective

- Find the latest 2 focus sessions for a customer

In this step, imagine that we only want to see the latest 2 (out of 3) focus sessions. How would you do that?

Steps

1. Update the data set to have 3 focus sessions, 3 hours apart

```js
focusSessions: [
    {
      id: "1",
      name: "Session 1",
      description: "Description for Session 1",
      notes: "Notes for Session 1",
      startDateTime: "2023-07-01T10:00:00Z",
      duration: 60,
      themeId: "1",
      customerId: "1",
    },
    {
      id: "2",
      name: "Session 2",
      description: "Description for Session 2",
      notes: "Notes for Session 2",
      startDateTime: "2023-07-01T11:00:00Z",
      duration: 90,
      themeId: "2",
      customerId: "1",
    } ,
    {
      id: "3",
      name: "Session 3",  
    description: "Description for Session 3",
      notes: "Notes for Session 3",
      startDateTime: "2023-07-01T12:00:00Z",
      duration: 120,
      themeId: "1",
      customerId: "1",
    }
  ],
```

2. update the focusSessions customer schema to allow filters for the args of `pageSize`, & `pageNumber`. Add in the filtering logic

```js
args: {
  pageSize: { type: GraphQLInt },
  pageNumber: { type: GraphQLInt }
},
```

Add in a filter by pageSize and pageNumber

```js
resolve(parent, args) {
  if (args.pageSize != null && args.pageNumber != null) {
    const startIndex = args.pageNumber * args.pageSize;
    const endIndex = startIndex + args.pageSize;
    return _.slice(filteredSessions, startIndex, endIndex);          
  } else {
      return filteredSessions;
  }
}
```

Add in sorting to make sure it is the most recent

```js
filteredSessions = _.orderBy(filteredSessions, ["startDateTime"], ["desc"]);        
```

all together you get:

```js
args: {
  pageSize: { type: GraphQLInt },
  pageNumber: { type: GraphQLInt }
},
resolve(parent, args) {
  let filteredSessions = _.filter(focusSessions, {
      customerId: parent.id
  });
  filteredSessions = _.orderBy(filteredSessions, ["startDateTime"], ["desc"]);
  if (args.pageSize != null && args.pageNumber != null) {
    const startIndex = args.pageNumber * args.pageSize;
    const endIndex = startIndex + args.pageSize;
    return _.slice(filteredSessions, startIndex, endIndex);          
  } else {
      return filteredSessions;
  }
}
```

try out several pageSizes and pageNumbers.
```js
{
   customer(id: "1"){
      id
      name
      focusSessions(pageNumber: 2,pageSize: 1){
         id
         name
         notes
         startDateTime
      }
   }
}
```

returns the first session, also the oldest.

```js
{
  "data": {
    "customer": {
      "id": "1",
      "name": "Alice",
      "focusSessions": [
        {
          "id": "1",
          "name": "Session 1",
          "notes": "Notes for Session 1",
          "startDateTime": "2023-07-01T10:00:00Z"
        }
      ]
    }
  }
}
```

**Bonus:** Add a field called `lastTwoFocusSessions`


