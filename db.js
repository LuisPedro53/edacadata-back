const sql = require("mssql");

const config = {
  user: "sa",
  password: "serv123A*",
  server: "sqlserver",

  options: {
    encrypt: false,
  },
};

const poolPromise = sql
  .connect(config)
  .then((pool) => {
    console.log("Conectado ao banco de dados");
    return pool;
  })
  .catch((err) => console.log("Erro na conexão do banco de dados", err));

module.exports = { sql, poolPromise };
