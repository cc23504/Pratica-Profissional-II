
const Connection = require ('tedious').Connection;
const Request = require('tedious').Request;

const config = {
    server: 'regulus.cotuca.unicamp.br',
    authentication: {
        type: 'default',
        options: {
            userName: "BD23504",
            password:"BD23504"
        }
    },
    options:{
        port: 1194,
        database: 'BD23504',
        trustsServerCertificate: true
    }
}

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err)=>{
    if(err){
        console.log("Erro se conectar no ssms");
        throw err;
    }
    executeStatement();
});

function executeStatement(){
    const request = new Request("SELECT 24/2", (err, rowCont)=>{
        if(err){
            throw err;
        }
        connection.close();
    });
    request.on('row', (columms)=>{
        console.log(columms);
    })

    connection.execSql(request);
}