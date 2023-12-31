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
      try {
        const result = await pedidoDB.inserirNovoPedido(
          idCliente,
          idArmario,
          statusInicial,
          dataAgora
        );
      } catch (erro) {
        console.log(erro.message);
        res.redirect(`/meusAlugueis/${idCliente}?alertMessage=` + erro.message);
        return;
      }

      res.redirect(`/confirmacao/${idCliente}`);
    };
  }

  exibirTelaConfirmacao() {
    return async function (req, res) {
      const idCliente = req.params.idCliente;

      res.render("confirmacao", { idCliente });
    };
  }


  exibirTelaMeusAlugueis() {
    return async function (req, res) {
      const idCliente = req.params.idCliente;
      const pedidoDB = new pedidoDAO(bd);

      const resultadoPedido = await pedidoDB.buscarPedidoAtivoPorUsuario(
        idCliente
      );
      let pedidoAtivo = null;
      if (resultadoPedido.recordset && resultadoPedido.recordset.length > 0) {
        pedidoAtivo = resultadoPedido.recordset[0];
      }

      const resultadoPedidos = await pedidoDB.buscarPedidosPorUsuario(
        idCliente
      );
      let pedidos = [];
      if (resultadoPedidos.recordset && resultadoPedidos.recordset.length > 0) {
        pedidos = resultadoPedidos.recordset;
      }

      res.render("meusAlugueis", { pedidos, pedido: pedidoAtivo, idCliente });
    };
  }

  finalizarAluguel() {
    return async function (req, res) {
      const idCliente = req.body.idCliente;
      const idPedido = req.body.idPedido;
      const pedidoDB = new pedidoDAO(bd);
      const result = await pedidoDB.finalizarPedidoAtivo(idPedido);

      res.redirect(`/meusAlugueis/${idCliente}`);
    };
  }
}

module.exports = pedidoCON;
