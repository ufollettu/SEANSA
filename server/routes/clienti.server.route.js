const express = require('express');
const router = express.Router();

const ClientiController = require('./../controllers/clienti.server.controller');

router.post('/', ClientiController.create); // C
router.get('/', ClientiController.get); // R
router.put('/', ClientiController.updateAllFields); // U by SC_ID
router.put('/:id', ClientiController.updateDeleted); // U set SC_DELETED=1 by SC_ID
// router.delete('/', UtentiController.remove); // D

module.exports = router;