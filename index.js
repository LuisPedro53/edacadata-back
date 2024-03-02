const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { poolPromise } = require("./db.js");

const app = express();
const port = 8000;

poolPromise
  .then((pool) => {
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro na conexão com o banco de dados:", err);
  });
