const express = require('express');
const { Dados} = require('../controllers/dadosControllers.js');
const dadosRouter = express.Router();
dadosRouter.get('/dados', Dados);
module.exports = {dadosRouter};