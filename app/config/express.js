const express = require("express");  //importa o express

const bodyParser = require("body-parser");

const app = express();   // inicializa o express
app.use(express.static("./arquivos"));  //diz para o express aonde esta os arquivos css e js (imagens)
app.use(
    bodyParser.urlencoded({
       extended: true,
    })
 ); // faz o express interpretar dados na URL do site

app.set("views", ("./views"))  //falando com express aonde esta as views (html em formato ejs)
app.set("view engine","ejs");  // define o modulo que executa as views de html e ejs

app.set("class", "./arquivos/classes");   //diz para o express aonde estaram os arquivos de classes 


const rotas = require("../rotas/rotas");
rotas(app);


module.exports = app;