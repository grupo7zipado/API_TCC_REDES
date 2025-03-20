// Imports
// Cria as rotas
const express = require("express");
// Funções da rota
const { CadatroUsuarioEsp } = require("../controllers/usuariosEspControllers");

// Cria as rotas
const usuariosEspRouter = express.Router();

// Relaciona o usuário ao esp
usuariosEspRouter.post("/usuariosEsp", CadatroUsuarioEsp)

// Exporta
module.exports = { usuariosEspRouter}
