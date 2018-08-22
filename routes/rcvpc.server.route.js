const express = require('express');
const router = express.Router();

const switchMode = require('../helpers/licence_helper');

router.post('/', switchMode);


module.exports = router;
