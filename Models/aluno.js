const { poolPromise } = require("../db.js");
const sql = require("mssql");

async function getAlunos(filter) {
  try {
    const pool = await poolPromise;

    if (!pool) {
      throw new Error("Erro: pool é undefined");
    }

    const databaseCheckQuery = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Aluno')
      BEGIN
        CREATE DATABASE Aluno;
      END
      `;

    await pool.request().query(databaseCheckQuery);
    await pool.request().query("USE ALUNO");

    const tableCheckQuery = `
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Alunos')
    BEGIN
        CREATE TABLE [dbo].Alunos (
            [cdAluno] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
            [nmAluno] varchar(250) NOT NULL,
            [emailAluno] varchar(250) NOT NULL,
            [cpfAluno] varchar(250) NOT NULL
        );
    END`;
    await pool.request().query(tableCheckQuery);

    let query = "SELECT * FROM ALUNOS WHERE 1=1";
    const parameters = {};

    if (filter.nmAluno) {
      query += " AND nmAluno LIKE @nmAluno";
      parameters.nmAluno = "%" + filter.nmAluno + "%";
    }
    if (filter.cpfAluno) {
      query += " AND cpfAluno LIKE @cpfAluno";
      parameters.cpfAluno = "%" + filter.cpfAluno + "%";
    }
    if (filter.emailAluno) {
      query += " AND emailAluno LIKE @emailAluno";
      parameters.emailAluno = "%" + filter.emailAluno + "%";
    }

    const request = pool.request();
    for (const [key, value] of Object.entries(parameters)) {
      request.input(key, sql.VarChar, value);
    }

    const result = await request.query(query);

    if (!result || !result.recordset) {
      throw new Error("Nenhum resultado encontrado na consulta");
    }

    return result.recordset;
  } catch (err) {
    console.error("Erro ao obter alunos", err);
    throw err;
  }
}

async function createAluno(aluno) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("nmAluno", sql.VarChar, aluno.nmAluno)
      .input("cpfAluno", sql.VarChar, aluno.cpfAluno)
      .input("emailAluno", sql.VarChar, aluno.emailAluno)
      .query(
        "INSERT INTO Alunos (nmAluno, cpfAluno, emailAluno) VALUES (@nmAluno, @cpfAluno, @emailAluno)"
      );

    const queryResult = await pool
      .request()
      .query("SELECT TOP 1 * FROM Alunos ORDER BY cdAluno DESC");

    return queryResult.recordset[0];
  } catch (err) {
    console.error("Erro ao criar aluno", err.message);
    throw new Error("Falha ao criar aluno: " + err.message);
  }
}

async function updateAluno(cdAluno, aluno) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("cdAluno", sql.VarChar, cdAluno)
      .input("nmAluno", sql.VarChar, aluno.nmAluno)
      .input("cpfAluno", sql.VarChar, aluno.cpfAluno)
      .input("emailAluno", sql.VarChar, aluno.emailAluno)
      .query(
        "UPDATE Alunos SET nmAluno = @nmAluno, cpfAluno = @cpfAluno, emailAluno = @emailAluno WHERE cdAluno = @cdAluno"
      );

    const queryResult = await pool
      .request()
      .input("cdAluno", sql.VarChar, cdAluno)
      .query("SELECT * FROM Alunos WHERE cdAluno = @cdAluno");

    return queryResult.recordset[0];
  } catch (err) {
    console.error("Erro ao atualizar aluno", err.message);
    throw new Error("Falha ao atualizar aluno: " + err.message);
  }
}

async function deleteAluno(cdAluno) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("cdAluno", sql.VarChar, cdAluno)
      .query("DELETE FROM Alunos WHERE cdAluno = @cdAluno");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Erro ao deletar aluno", err.message);
    throw new Error("Falha ao deletar aluno: " + err.message);
  }
}

module.exports = { getAlunos, createAluno, updateAluno, deleteAluno };
