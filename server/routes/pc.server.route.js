const express = require('express');
const router = express.Router();

const PcController = require('./../controllers/pc.server.contoller');

router.post('/', PcController.create); // C

router.get('/', PcController.get); // R
router.get('/:id', PcController.getById); // R by SP_ID
router.get('/hwid/:id', PcController.getByHwId); // R by SP_HW_ID

router.put('/:id', PcController.update); // U SP_HW_ID by SP_ID
router.delete('/:id', PcController.remove); // D by SP_ID

module.exports = router;