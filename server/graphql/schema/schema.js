const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    photo: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        // Here you would typically fetch data from a database or another source
        // For demonstration purposes, we'll return a static customer object
        return {
          id: args.id,
          name: "John Doe",
          photo: "photo.jpg",
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
