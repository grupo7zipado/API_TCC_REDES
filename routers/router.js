const { dadosRouter } = require("./dados");
const { usuariosRouter} = require("./usuarios")
const express = require('express');
const router = express.Router();
router.use( "/", dadosRouter );
router.use("/", usuariosRouter)
module.exports = router;