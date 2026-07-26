const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const customers = require("../../data/data").customers;
const focusSessions = require("../../data/data").focusSessions;
const themes = require("../../data/data").themes;

const _ = require("lodash");



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
    },
    lastTwoFocusSessions: {
      type: new GraphQLList(FocusSessionType),
      resolve(parent, args) {
        const filteredSessions = _.filter(focusSessions, {
            customerId: parent.id
        });
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
        resolve(parent, args) {
            return _.find(themes, { id: parent.themeId });
        }
    },
    
    customer: { type: CustomerType,
        resolve(parent, args) {
            return _.find(customers, { id: parent.customerId });
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
    themes: {
      type: new GraphQLList(ThemeType),
      args: { color: { type: GraphQLString } },
      resolve(parent, args) {
        if(args.color) return _.filter(themes, { color: args.color });
        else return themes;
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(customers, { id: args.id });
      },
    },
    focusSession: {
      type: FocusSessionType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(focusSessions, { id: args.id });
      },
    },
    theme: {
      type: ThemeType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(themes, { id: args.id });
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
      resolve(parent, args) {
        const customer = {
          id: String(customers.length + 1),
          name: args.name,
          photo: args.photo,
        };
        customers.push(customer);
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
      resolve(parent, args) {
        const focusSession = {
          id: String(focusSessions.length + 1),
          name: args.name,
          description: args.description,
          notes: args.notes,
          startDateTime: args.startDateTime,
          duration: args.duration,
          themeId: args.themeId,
          customerId: args.customerId,
        };
        focusSessions.push(focusSession);
        return focusSession;
      },
    },
    createTheme: {
      type: ThemeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLString },
      },
      resolve(parent, args) {
        const theme = {
          id: String(themes.length + 1),
          name: args.name,
          color: args.color,
        };
        themes.push(theme);
        return theme;
      },
    },
  },
});

module.exports = new GraphQLSchema({ 
    query: RootQuery ,
    mutation: Mutation
});
