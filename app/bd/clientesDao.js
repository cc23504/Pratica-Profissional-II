class ClientesDao {
  constructor(bd) {
    this._bd = bd;
  }


  async inserirClienteNoBanco(nome, email, cpf, telefone, senha) {
    try {
      const sql = `EXEC ChargerHelp.InserirCliente @nomeCliente = '${nome}', @CPFCliente = '${cpf}', @telefoneCliente = '${telefone}', @emailCliente = '${email}', @senhaCliente = '${senha}'`;
      const recordset = await this.queryDB(sql);
      return recordset;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async buscarClientePorEmail(email_cliente) {
    try {
      const sql = `SELECT * FROM ChargerHelp.Cliente WHERE email_cliente = '${email_cliente}'`;
      const recordset = await this.queryDB(sql);
      return recordset;
    } catch (error) {
      throw new Error("Email de usuário não encontrado!");
    }
  }

  queryDB(sql) {
    return new Promise((resolve, reject) => {
        this._bd.query(sql, (error, recordset) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(recordset);
        });

    });
  }
}

module.exports = ClientesDao;
