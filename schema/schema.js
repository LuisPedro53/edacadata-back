const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return {
          name: "John Doe",
        };
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),

      resolve(parent, args) {
        return [
          {
            name: "Alef Pereira",
            name: "Pericles Rosa",
          },
        ];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
