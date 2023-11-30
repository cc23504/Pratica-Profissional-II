class ClientesDao {
    constructor(bd) {
        this._bd = bd;
    }

    inserirClienteNoBanco(nome, email, cpf, telefone, senha) {
        return new Promise((resolve, reject) => {
            const storedProcedure = 'InserirCliente';
            
            // Define os parâmetros usando a notação @param
            const params = {
                NomeCliente: nome,
                CPFCliente: cpf,
                TelefoneCliente: telefone,
                EmailCliente: email,
                SenhaCliente: senha
            };
    
            // Chama a stored procedure com os parâmetros
            this._bd.request()
                .input('NomeCliente', mssql.VarChar, params.NomeCliente)
                .input('CPFCliente', mssql.VarChar, params.CPFCliente)
                .input('TelefoneCliente', mssql.VarChar, params.TelefoneCliente)
                .input('EmailCliente', mssql.VarChar, params.EmailCliente)
                .input('SenhaCliente', mssql.VarChar, params.SenhaCliente)
                .execute(storedProcedure, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject("CADASTRO DE CLIENTE FALHOU!");
                    }
                    resolve(result);
                });
        });
    }

    // inserirClienteNoBanco(nome,email,cpf,telefone,senha) {
    //     return new Promise((resolve, reject) => {
    //         const sql = `INSERT INTO ChargerHelp.Cliente (cpf_cliente,nome_cliente, telefone_cliente, email_cliente,senha_cliente)
    //              VALUES ('${cpf}', '${nome}','${telefone}', '${email}','${senha}')`
    //         this._bd.query(sql, function (erro, recordset) {
    //             if (erro) {
    //                 console.log(erro);
    //                 return reject("CADASTRO DE CLIENTE FALHOU!");
    //             }
    //             resolve(recordset);
    //         });
    //     });
    // }

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