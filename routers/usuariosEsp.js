const express = require("express");
const { CadatroUsuarioEsp } = require("../controllers/usuariosEspControllers");
const usuariosEspRouter = express.Router();
usuariosEspRouter.post("/usuariosEsp", CadatroUsuarioEsp)
module.exports = { usuariosEspRouter}
