const bd = require("../config/database");
const armariosDAO = require("../bd/armariosDAO");
const pedidoDAO = require("../bd/pedidoDao");


class interfaceCON {
    buscarInformacoesArmarios() {
        return async function (req, res) {
            console.log("buscando armarios")
            const armariosDB = new armariosDAO(bd);
            const result = await armariosDB.estadoSimplesArmarios();
            const listaArmarios = result.recordset;
            let stringMapeada = "";
            listaArmarios.forEach(armario => {
                stringMapeada = `${stringMapeada}${stringMapeada!="" ? ";" : ""}${armario.id_armario},${armario.status}`
            });

            //formato do retorno: 1,Aguardando;2,Ocupado;3,Livre
            res.send(stringMapeada);
        }
    }

    atualizarStatusCarregamento() {
        return async function (req, res) {
            //a mensagem do arduino é enviado pelo java no campo msg do body
            const mensagem = req.body.msg;

            let idArmario;
            let estaCarregando;

            //verifica se a mensagem recebida do java começa com "C", portanto relacionado ao carregamento
            //se começar, divide os dados da mensagem e salva em idArmario e estaCarregando
            if(mensagem.startsWith("C")){
                const mensagemSplitada = mensagem.split("");
                idArmario = mensagemSplitada[1]; //C(0)0
                estaCarregando = mensagemSplitada[2];
                console.log({idArmario, estaCarregando})
            } else {
                res.send()
            } 

            let statusAnterior = "";
            let novoStatus = "";
            if(estaCarregando == "1") {
                //Estava Aguardando, deve ir para Ocupado
                statusAnterior = "Aguardando";
                novoStatus = "Ativo";
            } else if (estaCarregando == "0") {
                //Estava Ocupado, deve ir para Livre
                statusAnterior = "Ativo";
                novoStatus = "Livre";
            }
            
            const pedidoDB = new pedidoDAO(bd);

            //primeiro busca se existe pedido com o idArmario e o status anterior
            const result = await pedidoDB.buscarPedidoAtivoPorIdArmario(idArmario, statusAnterior);
            const pedido = result.recordset[0];
           

            //se existir o pedido, atualiza o status dele para o novo status
            if(pedido) {
                const result = await pedidoDB.atualizarStatusPedido(pedido.id_pedido, novoStatus);
                res.send(result.recordset);
            }

            res.send();
        }
    }
}

module.exports = interfaceCON