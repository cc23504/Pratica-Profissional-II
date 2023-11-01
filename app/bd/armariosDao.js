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

}
module.exports = ArmariosDao;