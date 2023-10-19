const mssql = require("mssql");

const connection = mssql.createConnection({
    host:     'regulus.cotuca.unicamp.br',
    user:     'BD23507',
    password: 'BD23507',
    database: 'BD23507',
});


connection.connect(function (erro) {
  if(erro)
    console.log("ERRO na CONEXÃO com o BD NODEJS");
  else
    console.log("CONEXÃO com o BD NODEJS realizada com SUCESSO!");
});

module.exports = connection;