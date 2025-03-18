const express = require('express');
const { AllDataUser, LastDataUsers} = require('../controllers/dadosControllers.js');
const dadosRouter = express.Router();
dadosRouter.get('/allDataUser', AllDataUser);
dadosRouter.get('/lastDataUsers', LastDataUsers)
module.exports = {dadosRouter};