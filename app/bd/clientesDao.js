class ClientesDao {
    constructor(bd) {
        this._bd = bd;
    }

    inserirClienteNoBanco(nome, cpf, telefone, email) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO CLIENTES (cpfClie, nomeClie, dataNiverClie, emailClie) VALUES ('${cpf}', '${nome}','${telefone}', '${email}')`
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Lista de Clientes FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

    buscarClientePorEmail(email) {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT idClie, cpfClie, emailClie, nomeClie, DATE_FORMAT(dataNiverClie,"%d/%m/%Y") as dataNiverClie FROM CLIENTES ORDER BY idClie';
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Lista de Clientes FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

}
module.exports = ClientesDao;