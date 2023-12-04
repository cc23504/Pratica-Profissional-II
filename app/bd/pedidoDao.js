class PedidoDao {
    constructor(bd) {
        this._bd = bd;
    }

    inserirNovoPedido(idCliente, idArmario,statusInicial,dataAgora) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ChargerHelp.Pedido (cod_cliente, id_armario, status_pedido, horario_inicio) VALUES ('${idCliente}', '${idArmario}', '${statusInicial}', '${dataAgora}');
            select @@IDENTITY as idPedido`
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("FALHA NO PEDIDO!");
                }
                resolve(recordset);
            });
        }); 
    }

    buscarPedidosPorId(idPedido) {
        return new Promise((resolve, reject) => {
            var sql = `'SELECT * FROM ChargerHelp.Pedido where id_pedido ='${idPedido}`;
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("PEDIDO NÃO ENCONTRADO!");
                }
                resolve(recordset);
            });
        });
    }

    buscarPedidoAtivoPorIdArmario(idArmario, statusAnterior) {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM ChargerHelp.Pedido WHERE id_armario = '${idArmario}' AND status_pedido = '${statusAnterior}'`;
            console.log(sql)
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("PEDIDO NÃO ENCONTRADO!");
                }
                resolve(recordset);
            });
        });
    }

    buscarPedidosPorUsuario(idCliente) {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ChargerHelp.ViewPedidosUsuario
                        WHERE cod_cliente = ${idCliente};`;
            this._bd.query(sql, function (erro, recordset) {
                if (erro) { 
                    console.log(erro);
                    return reject("BUSCA POR PEDIDO FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

    buscarPedidoAtivoPorUsuario(idCliente) {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ChargerHelp.ViewPedidoAtivoUsuario
                        WHERE cod_cliente = ${idCliente};`;
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("BUSCA POR PEDIDO FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

    atualizarStatusPedido(idPedido, novoStatus) {
        return new Promise((resolve, reject) => {
            var sql = `UPDATE ChargerHelp.Pedido SET status_pedido = '${novoStatus}' WHERE id_pedido = ${idPedido}`;
            console.log(sql);
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("ALTERAÇÃO DO STATUS DO PEDIDO FALHOU!");
                }
                resolve(recordset);
            });
        });
    }
}
module.exports = PedidoDao;