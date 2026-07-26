module.exports = {
  customers: [
    { id: "1", name: "Alice" , photo: "Alice.jpg"},
    { id: "2", name: "Bob" , photo: "photo.jpg"},
    { id: "3", name: "Charlie" , photo: "Charlie.jpg"},
    { id: "4", name: "David" , photo: "David.jpg"},
    { id: "5", name: "Eve" , photo: "Eve.jpg"},
    { id: "6", name: "Frank" , photo: "Frank.jpg"},
  ],
  focusSessions: [
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
    },
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
  ],
  themes: [
    { id: "1", name: "Theme 1", color: "Red" },
    { id: "2", name: "Theme 2", color: "Blue" },
    { id: "3", name: "Theme 3", color: "Green" },
  ],

};