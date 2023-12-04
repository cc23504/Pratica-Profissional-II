const bd = require("../config/database");
const pedidoDAO = require("../bd/pedidoDao");

class pedidoCON {
  alugar() {
    return async function (req, res) {
      const idCliente = req.body.idCliente;
      const idArmario = req.body.idArmario;
      const statusInicial = "Aguardando";
      const dataAgora = new Date().toISOString();
      const pedidoDB = new pedidoDAO(bd);
      const result = await pedidoDB.inserirNovoPedido(
        idCliente,
        idArmario,
        statusInicial,
        dataAgora
      );
      const pedidoCriado = result.recordset[0];

      res.redirect(`/confirmacao/${pedidoCriado.idPedido}`);
    };
  }

  exibirTelaConfirmacao() {
    return async function (req, res) {
      const idPedido = req.params.idPedido;

      res.render("confirmacao", { idPedido });
    };
  }

  async alugarArmario(idCliente, idArmario, tempoUso) {
    try {
      const armarioAlugado = await ArmarioModel.findById(idArmario);
      armarioAlugado.status = "Ocupado";
      armarioAlugado.tempoFimAluguel = new Date(Date.now() + tempoUso * 60000);
      await armarioAlugado.save();

      return { success: true, message: "Armário alugado com sucesso!" };
    } catch (error) {
      // Em caso de erro, trate o erro e envie uma resposta apropriada
      console.error("Erro ao alugar o armário:", error);
      throw error;
    }
  }

  exibirTelaMeusAlugueis() {
    return async function (req, res) {
      const idCliente = req.params.idCliente;
      const pedidoDB =  new pedidoDAO(bd);

      const resultadoPedido = await pedidoDB.buscarPedidoAtivoPorUsuario(idCliente);
      let pedidoAtivo = null;
      if(resultadoPedido.recordset && resultadoPedido.recordset.length > 0) {
        pedidoAtivo = resultadoPedido.recordset[0];
      }

      const resultadoPedidos = await pedidoDB.buscarPedidosPorUsuario(idCliente);
      let pedidos = [];
      if(resultadoPedidos.recordset && resultadoPedidos.recordset.length > 0) {
        pedidos = resultadoPedidos.recordset;
      }

      res.render("meusAlugueis", {pedidos, pedido: pedidoAtivo, idCliente });
    };
  }
}

module.exports = pedidoCON;
