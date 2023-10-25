const mssql = require("mssql");

let connection;

try {
  connection = mssql.connect({
    server: 'regulus.cotuca.unicamp.br',
    user: 'BD23507',
    password: 'BD23507',
    database: 'BD23507',
  });

  console.log("CONEXÃO com o BD NODEJS realizada com SUCESSO!");

} catch (error) {
  console.log("ERRO na CONEXÃO com o BD NODEJS");
}

module.exports = connection;