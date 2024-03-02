const { poolPromise } = require("./db");

async function getAlunos() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM ALUNOS");
    return result.recordset;
  } catch (err) {
    console.error("Erro ao obter alunos", err);
  }
}

// Defina outras funções para inserir, atualizar e excluir alunos conforme necessário

module.exports = { getAlunos };
