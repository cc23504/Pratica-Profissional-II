const classClientesCON = require('../controllers/clientesCON');
const clienteCon = new classClientesCON();

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });  // permite que o site seja acessado por todos.


    app.get("/", (req, res) => {   // criando a rota principal que funciona para pagina de apresentação
        res.render("intro");     // esta renderizando a pagina de introdução
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.post("/fazerLoginCliente", clienteCon.fazerLogin());

    app.post("/", (req, res) => {
        4
        console.log(req.body);
        res.send(req.body);
    })

    app.get("/cadastro", (req, res) => {
        res.render("cadastro");
    });

    app.get("/alugar", (req, res) => {
        res.render("alugar", {
            carregadores
        });
    });

    app.get("/confirmacao", (req, res) => {
        res.render("confirmacao");
    });
};