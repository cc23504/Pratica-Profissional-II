class ArmariosDao {
    constructor(bd) {
        this._bd = bd;
    }   
    
    listarArmarios() {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM ProdutosComEstoque;'
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
module.exports = ArmariosDao;