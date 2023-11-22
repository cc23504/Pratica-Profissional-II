const bd = require("../config/database");
const clientesDAO = require("../bd/clientesDao");


class clientesCON {
    fazerLogin() {
        return async function (req, res) {
            const email = req.body.email
            const senha = req.body.senha
            const clientesDB = new clientesDAO(bd);
            const result = await clientesDB.buscarClientePorEmail(email)
            const listaClientes = result.recordset

            if (listaClientes.length<1) {
                return res.send('Email invalido!')
            }
            const cliente = listaClientes[0]
            if (cliente.senha_cliente != senha) {
                return res.send('Senha Invalida!')
            }
            res.redirect(`/alugar/${cliente.cod_cliente}`);
        }
    }

cadastrar() {
  return async (req, res) => {
    try {
      const { nome, email, cpf, telefone, senha } = req.body;

      const clientesDB = new clientesDAO(bd);
      const result = await clientesDB.inserirClienteNoBanco(nome, email, cpf, telefone, senha);

      if (result) {
        res.redirect('/login');
      } else {
        res.status(500).send("Erro ao cadastrar cliente.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno no servidor.");
    }
  };
}

    



}

module.exports = clientesCON