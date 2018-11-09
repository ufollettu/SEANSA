const express = require('express');
const router = express.Router();

const rcv_pcController = require('../controllers/rcv_pc.server.controller');

router.post('/', rcv_pcController.switchMode);

module.exports = router;
