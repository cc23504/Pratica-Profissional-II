class ArmariosDao {
    constructor(bd) {
        this._bd = bd;
    }   
    
    listarArmarios() {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM ViewArmariosComStatus;' // chama a view que retorna armário com informação do carregador e status
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("A busca da lista de armários FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

    estadoSimplesArmarios() {
        return new Promise((resolve, reject) => {
            var sql = `SELECT DISTINCT A.id_armario,
                            CASE 
                                WHEN P.id_pedido IS NOT NULL AND P.status_pedido = 'Ocupado' THEN 'Ocupado'
                                WHEN P.id_pedido IS NOT NULL AND P.status_pedido = 'Aguardando' THEN 'Aguardando'
                                ELSE 'Livre' 
                            END AS status
                        FROM ChargerHelp.Armario AS A
                        INNER JOIN ChargerHelp.Carregador AS C ON A.cod_carregador = C.cod_carregador
                        LEFT OUTER JOIN ChargerHelp.Pedido AS P ON A.id_armario = P.id_armario AND P.status_pedido <> 'Livre';
                    ` // select que retorna id do armario e o estado dele (Aguardando, Ocupado ou Livre)
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("A busca da lista de armários FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

}
module.exports = ArmariosDao;