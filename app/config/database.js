const mssql = require("mssql");

try {
  mssql.connect({
    options: { trustServerCertificate: true },
    server: 'regulus.cotuca.unicamp.br',
    user: 'BD23619',
    password: 'BD23619',
    database: 'BD23619',
 });

  console.log("CONEXÃO com o BD NODEJS realizada com SUCESSO!");

} catch (error) {
  console.log("ERRO na CONEXÃO com o BD NODEJS");
}

module.exports = mssql;