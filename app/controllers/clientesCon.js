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
            res.redirect(`/meusAlugueis/${cliente.cod_cliente}`);
        }
    }

    cadastrar(){
        return async function(req,res){
            const nome = req.body.nome
            const email = req.body.email
            const cpf = req.body.cpf
            const telefone = req.body.telefone
            const senha = req.body.senha

            const clientesDB = new clientesDAO(bd);
            try {
                const result = await clientesDB.inserirClienteNoBanco(nome,email,cpf,telefone,senha)
                res.redirect('/login');    
            } catch(erro){
                console.log(erro.message);
                res.redirect('/cadastro?alertMessage='+erro.message);
                return;
            }
                   
        }
    }
    



}

module.exports = clientesCON