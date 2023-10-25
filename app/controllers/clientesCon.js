const bd = require("../config/database");
const clientesDAO = require("../bd/clientesDao");


class conClientes {
    fazerLogin() {
        return async function (req, res) {
            const clientesDB = new clientesDAO(bd);
            const cliente = await clientesDB.buscarClientePorEmail(email)
            // ...

        }
    }
}