const { dadosRouter } = require("./dados");
const { espRouter } = require("./esp");
const { usuariosEspRouter } = require("./usuariosEsp");
const { usuariosRouter} = require("./usuarios");
const express = require('express');
const router = express.Router();
router.use( "/", dadosRouter );
router.use("/", usuariosRouter)
router.use("/", espRouter)
router.use("/", usuariosEspRouter)
module.exports = router;