const express = require('express');
const router = express.Router();

const rcvPcController = require('../controllers/rcvpc.server.controller');

// router.get('/', rcvPcController.list);
router.get('/:license', rcvPcController.show);
router.post('/', rcvPcController.create);
router.put('/:license', rcvPcController.update);
router.delete('/:license', rcvPcController.destroy);

module.exports = router;
