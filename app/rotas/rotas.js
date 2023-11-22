const classArmariosCON = require('../controllers/armariosCON');
const classClientesCON = require('../controllers/clientesCON');
const classPedidoCON = require('../controllers/pedidoCON');

const clienteCon = new classClientesCON();
const armariosCon = new classArmariosCON();
const pedidoCon = new classPedidoCON();

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.get('/', (req, res) => {
        res.render("intro");
    });

    app.get('/login', (req, res) => {
        res.render("login");
    });

    app.post('/fazerLoginCliente', clienteCon.fazerLogin);

    app.get('/cadastro', (req, res) => {
        res.render("cadastro");
    });
    app.post('/cadastrar',clienteCon.cadastrar());

    app.post('/inserirCliente', (req, res) => {
        const cliente = req.body;

        // Assuming you have clientesDB defined and exported in another file
        const clientesDB = require('../path-to-clientesDB-file');
        clientesDB.inserirClienteNoBanco(cliente);

        res.send('Cliente inserido com sucesso.');
    });

    app.get('/alugar/:idCliente', armariosCon.carregarPaginaArmarios);

    app.post('/alugarArmario', pedidoCon.alugar);

    app.get('/confirmacao/:idPedido', pedidoCon.exibirTelaConfirmacao);
};
