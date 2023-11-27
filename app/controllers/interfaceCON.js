const bd = require("../config/database");
const armariosDAO = require("../bd/armariosDAO");


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
}

module.exports = interfaceCON