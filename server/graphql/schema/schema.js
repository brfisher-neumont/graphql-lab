const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
    GraphQLInt,
} = require("graphql");

const customers = require("../../data/data").customers;
const focusSessions = require("../../data/data").focusSessions;

const _ = require("lodash");

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    photo: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
