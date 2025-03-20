// Imports
// Cria as rotas
const express = require("express")
// Funções da rota
const { cadastroUsuarios, } = require("../controllers/usuariosController");

// Cria as rotas
const usuariosRouter = express.Router();

// Asocia a funções as rotas
// Cadastra os usuarios
usuariosRouter.post("/usuarios", cadastroUsuarios);

// Exporta
module.exports = { usuariosRouter}
