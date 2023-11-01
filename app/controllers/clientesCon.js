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
            res.redirect('/alugar');
        }
    }

    



}

module.exports = clientesCON