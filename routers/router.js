const { dadosRouter } = require("./dados");
const express = require('express');
const router = express.Router();
router.use( "/dados", dadosRouter );
module.exports = router;