class ClientesDao {
  constructor(bd) {
    this._bd = bd;
  }

  // async inserirClienteNoBanco(nome, email, cpf, telefone, senha) {
  //     try {
  //         // Verificação de e-mail existente
  //         const clientes = await this.buscarClientePorEmail(email);
  //         if (clientes.length > 0) {
  //             throw new Error("E-mail já existe! Cadastro não realizado.");
  //         }

  //         // Verificação de CPF existente
  //         const recordsetCPF = await this.queryDB(`SELECT * FROM ChargerHelp.Cliente WHERE cpf_cliente = '${cpf}'`);
  //         if (recordsetCPF.length > 0) {
  //             throw new Error("CPF já existe! Cadastro não realizado.");
  //         }

  //         // Verificação de telefone existente
  //         const recordsetTelefone = await this.queryDB(`SELECT * FROM ChargerHelp.Cliente WHERE telefone_cliente = '${telefone}'`);
  //         if (recordsetTelefone.length > 0) {
  //             throw new Error("Telefone já existe! Cadastro não realizado.");
  //         }

  //         // Inserção do novo cliente
  //         await this.queryDB(`INSERT INTO ChargerHelp.Cliente (cpf_cliente, nome_cliente, telefone_cliente, email_cliente, senha_cliente)
  //                             VALUES ('${cpf}', '${nome}', '${telefone}', '${email}', '${senha}')`);

  //         return "Novo cliente inserido com sucesso!";
  //     } catch (error) {
  //         if (error.number === 2627) {
  //             // Se o erro for de violação de chave única (2627 é o código do SQL Server para essa violação)
  //             throw new Error("Erro: Dados duplicados.");
  //         } else {
  //             throw new Error("Erro ao inserir cliente.");
  //         }
  //     }
  // }

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
