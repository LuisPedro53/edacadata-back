const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const {
  getAlunos,
  createAluno,
  updateAluno,
  deleteAluno,
} = require("../Models/aluno");

const AlunoType = new GraphQLObjectType({
  name: "Aluno",
  fields: () => ({
    cdAluno: { type: GraphQLString },
    nmAluno: { type: GraphQLString },
    cpfAluno: { type: GraphQLString },
    emailAluno: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    alunos: {
      type: new GraphQLList(AlunoType),
      args: {
        cdAluno: { type: GraphQLString },
        nmAluno: { type: GraphQLString },
        cpfAluno: { type: GraphQLString },
        emailAluno: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getAlunos(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAluno: {
      type: AlunoType,
      args: {
        nmAluno: { type: new GraphQLNonNull(GraphQLString) },
        cpfAluno: { type: new GraphQLNonNull(GraphQLString) },
        emailAluno: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return createAluno(args);
      },
    },
    updateAluno: {
      type: AlunoType,
      args: {
        cdAluno: { type: new GraphQLNonNull(GraphQLString) },
        nmAluno: { type: GraphQLString },
        cpfAluno: { type: GraphQLString },
        emailAluno: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateAluno(args.cdAluno, args);
      },
    },
    deleteAluno: {
      type: GraphQLBoolean,
      args: {
        cdAluno: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return deleteAluno(args.cdAluno);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
