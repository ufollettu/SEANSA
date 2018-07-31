const express = require('express');
const router = express.Router();

// const verifyToken = require('../middleware').verifyToken;
const can = require('../middleware').can;
const allow = require('../middleware').allow;
const disallow = require('../middleware').disallow;

const UtentiPermessiController = require('./../controllers/utenti-permessi.server.controller');

router.get('/', can(1), UtentiPermessiController.list); // Index
router.post('/', can(1), allow(), UtentiPermessiController.list); // Create
router.delete('/', can(1), disallow(), UtentiPermessiController.list); // Destroy

module.exports = router;

