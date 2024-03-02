const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const AlunoType = new GraphQLObjectType({
  name: "Aluno",
  fields: () => ({
    nome: { type: GraphQLString },
    cpf: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    aluno: {
      type: AlunoType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Aqui você deve implementar a lógica para buscar um aluno do banco de dados
        // Você pode usar args.id para filtrar o aluno
      },
    },
    alunos: {
      type: new GraphQLList(AlunoType),
      resolve(parent, args) {
        // Aqui você deve implementar a lógica para buscar todos os alunos do banco de dados
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
