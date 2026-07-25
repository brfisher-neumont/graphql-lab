const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
    GraphQLInt,
    GraphQLList,
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
      resolve(parent, args) {
        return _.filter(focusSessions, { customerId: parent.id });
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

module.exports = new GraphQLSchema({ query: RootQuery });
