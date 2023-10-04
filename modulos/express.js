const carregadores = [
    {
        marca: "Samsung",
        nomeArmario: "Armario 1",
        status : "Disponivel",
        tipo: "type-c"
    },
    {
        marca: "Apple" ,
        nomeArmario: "Armario 2",
        status : "Indisponivel",
        tipo: "lightning"
    },
    {
        marca: "LG" ,
        nomeArmario: "Armario 3",
        status : "Disponivel",
        tipo: "micro-usb"
    },
    {
        marca: "Apple", 
        nomeArmario: "Armario 4",
        status : "Disponivel",
        tipo: "wireless"
    },
    {
        marca: "Samsung",
        nomeArmario: "Armario 5",
        status : "Disponivel",
        tipo: "type-c"
    },
    {
        marca: "Apple" ,
        nomeArmario: "Armario 6",
        status : "Indisponivel",
        tipo: "lightning"
    },
    {
        marca: "LG" ,
        nomeArmario: "Armario 7",
        status : "Disponivel",
        tipo: "micro-usb"
    },
    {
        marca: "Apple", 
        nomeArmario: "Armario 8",
        status : "Disponivel",
        tipo: "wireless"
    },
    {
        marca: "Apple", 
        nomeArmario: "Armario 9",
        status : "Disponivel",
        tipo: "wireless"
    },
]
const express = require("express");  //importa o express

const app = express();   // inicializa o express
app.use(express.static("./arquivos"));  //diz para o express aonde esta os arquivos css e js (imagens)
app.use(express.urlencoded()); // faz o express interpretar dados na URL do site

app.set("views", ("./views"))  //falando com express aonde esta as views (html em formato ejs)
app.set("view engine","ejs");  // define o modulo que executa as views de html e ejs

app.set("class", "./arquivos/classes");   //diz para o express aonde estaram os arquivos de classes 

app.get("/", (req, res)=>{   // criando a rota principal que funciona para pagina de apresentação
    res.render("intro");     // esta renderizando a pagina de introdução
});

app.get("/login", (req, res)=>{   
    res.render("login");     
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
        carregadores
    });
});

app.get("/confirmacao", (req, res)=>{
    res.render("confirmacao");
});

app.listen(3000,()=>{
    console.log("Servidor no ar!")
})