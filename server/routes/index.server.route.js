const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/index.server.controller');

/* GET home page. */
router.get('/', indexController.send);

module.exports = router;
