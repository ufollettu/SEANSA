const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/auth.server.controller');

/* POST login. */
router.post('/login', AuthController.login);

module.exports = router;