const bd = require("../config/database");
const armariosDAO = require("../bd/armariosDAO");


class armariosCON {
    carregarPaginaArmarios() {
        return async function (req, res) {
            console.log("buscando armarios")
            const armariosDB = new armariosDAO(bd);
            const result = await armariosDB.listarArmarios();
            const listaArmarios = result.recordset
            const idCliente = req.params.idCliente

            console.log(listaArmarios)

            res.render('alugar', { armarios: listaArmarios, idCliente })
        }
    }
}

module.exports = armariosCON