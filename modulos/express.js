const express = require("express");  //importa o express

const app = express();   // inicializa o express
app.use(express.static("./arquivos"));  //diz para o express aonde esta os arquivos css e js (imagens)
app.use(express.urlencoded()); // faz o express interpretar dados na URL do site

app.set("views", ("./views"))  //falando com express aonde esta as views (html em formato ejs)
app.set("view engine","ejs");  // define o modulo que executa as views de html e ejs

app.set("class", "./arquivos/classes");   //diz para o express aonde estaram os arquivos de classes 

app.get("/", (req, res)=>{   // criando a rota principal que funciona como Login
    res.render("login");     // esta renderizando a pagina de login
});

app.post("/", (req, res)=>{4
    console.log(req.body);
    res.send(req.body);
})

app.get("/cadastro", (req, res)=>{
    res.render("cadastro");
});

app.get("/alugar", (req, res)=>{
    res.render("alugar", {
        armario:{nome:"Armario 1"}
    });
});

app.get("/confirmacao", (req, res)=>{
    res.render("confirmacao");
});

app.listen(3000,()=>{
    console.log("Servidor no ar!")
})