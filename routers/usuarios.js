const express = require("express")
const { cadastroUsuarios, } = require("../controllers/usuariosController");
const usuariosRouter = express.Router();
usuariosRouter.post("/usuarios", cadastroUsuarios)
module.exports = { usuariosRouter}
