const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");


const _ = require("lodash");

const { PutCommand, ScanCommand, QueryCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const docClient = require("../../db/dynamo");
const { CUSTOMERS_TABLE, FOCUS_SESSIONS_TABLE, THEMES_TABLE } = require("../../db/tableNames");




const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    photo: { type: GraphQLString },
    focusSessions: {
      type: new GraphQLList(FocusSessionType),
      
      args: {
        pageSize: { type: GraphQLInt },
        pageNumber: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const result = await docClient.send(new QueryCommand({
          TableName: FOCUS_SESSIONS_TABLE,
          IndexName: "customerId-index",
          KeyConditionExpression: "customerId = :customerId",
          ExpressionAttributeValues: { ":customerId": parent.id }
        }));
        let filteredSessions = result.Items;
        filteredSessions = _.orderBy(filteredSessions, ["startDateTime"], ["desc"]);
        if (args.pageSize != null && args.pageNumber != null) {
          const startIndex = args.pageNumber * args.pageSize;
          const endIndex = startIndex + args.pageSize;
          return _.slice(filteredSessions, startIndex, endIndex);          
        } else {
            return filteredSessions;
        }
      }
    },
    lastTwoFocusSessions: {
      type: new GraphQLList(FocusSessionType),
      async resolve(parent, args) {
        const result = await docClient.send(new QueryCommand({
            TableName: FOCUS_SESSIONS_TABLE,
            IndexName: "customerId-index",
            KeyConditionExpression: "customerId = :customerId",
            ExpressionAttributeValues: { ":customerId": parent.id },
        }));
        const filteredSessions = result.Items;
        const sortedSessions = _.orderBy(filteredSessions, ["startDateTime"], ["desc"]);
        return _.take(sortedSessions, 2);
      }
    }
  }),
});

const FocusSessionType = new GraphQLObjectType({
  name: "FocusSession",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    startDateTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    theme: { type: ThemeType,
        async resolve(parent, args) {
            if (!parent.themeId) return null;
            const result = await docClient.send(new GetCommand({ TableName: THEMES_TABLE, Key: { id: parent.themeId } }));
            return result.Item;
        }
    },

    customer: { type: CustomerType,
        async resolve(parent, args) {
            const result = await docClient.send(new GetCommand({ TableName: CUSTOMERS_TABLE, Key: { id: parent.customerId } }));
            return result.Item;
        }
    }
  }),
});

const ThemeType = new GraphQLObjectType({
  name: "Theme",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parent, args) {
        const result = await docClient.send(new ScanCommand({ TableName: CUSTOMERS_TABLE }));
        return result.Items;
      }
    },
    focusSessions: {
        type: new GraphQLList(FocusSessionType),
        args: { customerId: { type: GraphQLID } },
        async resolve(parent, args) {
            if (args.customerId) {
              const result = await docClient.send(new QueryCommand({
                TableName: FOCUS_SESSIONS_TABLE,
                IndexName: "customerId-index",
                KeyConditionExpression: "customerId = :customerId",
                ExpressionAttributeValues: { ":customerId": args.customerId },
              }));
              return result.Items;
            }
            const result = await docClient.send(new ScanCommand({ TableName: FOCUS_SESSIONS_TABLE }));
            return result.Items;
        }
    },
    themes: {
      type: new GraphQLList(ThemeType),
      args: { color: { type: GraphQLString } },
      async resolve(parent, args) {
        const result = await docClient.send(new ScanCommand({ TableName: THEMES_TABLE }));
        if (args.color) return _.filter(result.Items, { color: args.color });
        return result.Items;
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },

      async resolve(parent, args) {
        const result = await docClient.send(new GetCommand({ TableName: CUSTOMERS_TABLE, Key: { id: args.id } }));
        return result.Item;
      },
    },
    focusSession: {
      type: FocusSessionType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const result = await docClient.send(new GetCommand({ TableName: FOCUS_SESSIONS_TABLE, Key: { id: args.id } }));
        return result.Item;
      },
    },
    theme: {
      type: ThemeType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const result = await docClient.send(new GetCommand({ TableName: THEMES_TABLE, Key: { id: args.id } }));
        return result.Item;
      },
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const customer = {
        id: uuidv4(),
        name: args.name,
        photo: args.photo,
        };
        await docClient.send(new PutCommand({ TableName: CUSTOMERS_TABLE, Item: customer }));
        return customer;
      },
    },
    createFocusSession: {
      type: FocusSessionType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        notes: { type: GraphQLString },
        startDateTime: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: GraphQLInt },
        themeId: { type: GraphQLID },
        customerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const focusSession = {
          id: uuidv4(),
          name: args.name,
          description: args.description,
          notes: args.notes,
          startDateTime: args.startDateTime,
          duration: args.duration,
          themeId: args.themeId,
          customerId: args.customerId,
        };
        await docClient.send(new PutCommand({ TableName: FOCUS_SESSIONS_TABLE, Item: focusSession }));
        
        return focusSession;
      },
    },
    createTheme: {
      type: ThemeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const theme = {
          id: uuidv4(),
          name: args.name,
          color: args.color,
        };
        await docClient.send(new PutCommand({ TableName: THEMES_TABLE, Item: theme }));
        return theme;
      },
    },
  },
});

module.exports = new GraphQLSchema({ 
    query: RootQuery ,
    mutation: Mutation
});
