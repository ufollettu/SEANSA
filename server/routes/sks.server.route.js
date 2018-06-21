const express = require('express');
const router = express.Router();

const SksController = require('./../controllers/sks.server.controller');

// const passport = require('passport');

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }), UtentiController.get);

router.post('/', SksController.create); // C
router.get('/', SksController.get); // R
// router.put('/', UtentiController.update); // U
// router.delete('/', UtentiController.remove); // D
// router.post('/login', UtentiController.login);

module.exports = router;