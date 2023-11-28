const classArmariosCON = require('../controllers/armariosCON'); //importanto a classe armariosCON
const classClientesCON = require('../controllers/clientesCON'); //importanto a class clientesCON
const classPedidoCON = require('../controllers/pedidoCON');     //importando a class pedidoCON
const classInterfaceCON = require('../controllers/interfaceCON');     //importando a class interfaceCON


const clienteCon = new classClientesCON();      // instanciando a class
const armariosCon = new classArmariosCON();     // instanciando a class
const pedidoCon = new classPedidoCON();         //instanciando a class
const interfaceCon = new classInterfaceCON();         //instanciando a class

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });  // permite que o site seja acessado por todos.


    app.get('/', (req, res) => {   // criando a rota principal que funciona para pagina de apresentação
        res.render("intro");     // esta renderizando a pagina de introdução
    });

    app.get('/login', (req, res) => {
        res.render("login");
    });

    app.post('/fazerLoginCliente', clienteCon.fazerLogin()); //o formulario envia as informacoes de fazer login atraves da rota fazerLoginCliente 

    app.get('/cadastro', (req, res) => {
        res.render("cadastro");
    });

    app.post('/cadastrar',clienteCon.cadastrar());

    app.get('/alugar/:idCliente', armariosCon.carregarPaginaArmarios());

    app.post('/alugarArmario', pedidoCon.alugar());

    app.get('/confirmacao/:idPedido', pedidoCon.exibirTelaConfirmacao());
   
    //retorna a lista de armários e o estado deles para o java
    app.get('/interface/armarios', interfaceCon.buscarInformacoesArmarios());

// Rota para alugar um armário
app.post('/alugarArmario', (req, res) => {
    const idCliente = req.body.idCliente;
    const idArmario = req.body.idArmario;
    const tempoUso = req.body.tempoUso; // Recupera o tempo selecionado

    // Aqui você pode realizar as operações para registrar o aluguel do armário com o tempo selecionado
    pedidoCon.alugarArmario(idCliente, idArmario, tempoUso)
        .then((resultado) => {
            // Trate o resultado conforme necessário
            res.status(200).json({ message: 'Armário alugado com sucesso!' });
        })
        .catch((erro) => {
            // Em caso de erro, trate o erro e envie uma resposta apropriada
            res.status(500).json({ error: 'Erro ao alugar o armário', detalhes: erro });
        });
});


};
