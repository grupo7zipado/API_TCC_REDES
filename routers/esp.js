const express = require("express")
const { CadastroEsp, } = require("../controllers/espControllers");
const espRouter = express.Router();
espRouter.post("/usuarios", CadastroEsp)
module.exports = { espRouter}
