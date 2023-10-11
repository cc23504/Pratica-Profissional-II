class PedidoDao {
    constructor(bd) {
        this._bd = bd;
    }

    inserirNovoPedido(idUsuario, idArmario, status, dorarioInicio, horarioFim) {
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

    buscarPedidosPorId(idPedido) {
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

    buscarPedidosPorArmario(idArmario) {
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

    buscarPedidosPorUsuario(idUsuario) {
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

    atualizarPedido(pedido) {
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
module.exports = PedidoDao;