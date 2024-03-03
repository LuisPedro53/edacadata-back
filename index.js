const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { sql, poolPromise } = require("./db.js");

const app = express();
const port = 8080;

poolPromise
  .then((pool) => {
    if (!pool) {
      throw new Error("Erro: pool é undefined");
    }

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
