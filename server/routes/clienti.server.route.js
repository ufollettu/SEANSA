const express = require('express');
const router = express.Router();

const ClientiController = require('./../controllers/clienti.server.controller');

// const passport = require('passport');

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }), UtentiController.get);

router.post('/', ClientiController.create); // C
router.get('/', ClientiController.get); // R
// router.put('/', UtentiController.update); // U
// router.delete('/', UtentiController.remove); // D
// router.post('/login', UtentiController.login);

module.exports = router;