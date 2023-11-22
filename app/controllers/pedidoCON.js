const bd = require("../config/database");
const pedidoDAO = require("../bd/pedidoDao");

class pedidoCON {
    alugar() {
        return async function (req, res) {
            const idCliente = req.body.idCliente
            const idArmario = req.body.idArmario
            const statusInicial = 'Aguardando'
            const dataAgora = (new Date()).toISOString();
            const pedidoDB = new pedidoDAO(bd);
            const result = await pedidoDB.inserirNovoPedido(idCliente, idArmario,statusInicial,dataAgora)
            const pedidoCriado = result.recordset[0]

            res.redirect(`/confirmacao/${pedidoCriado.idPedido}`);
        }
    }

    exibirTelaConfirmacao(){
        return async function(req, res){
            const idPedido = req.params.idPedido

            res.render('confirmacao',{idPedido}) 
        }
    }
 
}


module.exports = pedidoCON;