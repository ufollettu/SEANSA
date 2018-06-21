const express = require('express');
const router = express.Router();

const UtentiController = require('./../controllers/utenti.server.controller');

// const passport = require('passport');

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }), UtentiController.get);

router.post('/', UtentiController.create); // C
router.get('/', UtentiController.get); // R
// router.put('/', UtentiController.update); // U
// router.delete('/', UtentiController.remove); // D
// router.post('/login', UtentiController.login);

module.exports = router;