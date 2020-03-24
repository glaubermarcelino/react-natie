const express = require("express");
var app = express();


app.get("/",(request,response) => {

    return response.json(
        {
            "Aluno": "Glauber Marcelino",
            "Semana Omnistack": "Aula 01"
        }
        );
});
app.listen("3333");