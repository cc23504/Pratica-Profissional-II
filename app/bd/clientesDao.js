class ClientesDao {
    constructor(bd) {
        this._bd = bd;
    }

    inserirClienteNoBanco(nome,email,cpf,telefone,senha) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ChargerHelp.Cliente (cpf_cliente,nome_cliente, telefone_cliente, email_cliente,senha_cliente) VALUES ('${cpf}', '${nome}','${telefone}', '${email}',${senha})`
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("CADASTRO DE CLIENTE FALHOU!");
                }
                resolve(recordset);
            });
        });
    }

    buscarClientePorEmail(email_cliente) {
        return new Promise((resolve, reject) => {
            var sql = `SELECT  * FROM ChargerHelp.Cliente WHERE email_cliente = '${email_cliente}'`;
            this._bd.query(sql, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("EMAIL DE USUÁRIO NÃO ENCONTRADO!");
                }
                resolve(recordset);
            });
        });
    }

}
module.exports = ClientesDao;