const express = require('express');
const { Dados, LastDataUsers} = require('../controllers/dadosControllers.js');
const dadosRouter = express.Router();
dadosRouter.get('/dados', Dados);
dadosRouter.get('/lastDataUsers', LastDataUsers)
module.exports = {dadosRouter};