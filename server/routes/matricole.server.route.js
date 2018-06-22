const express = require('express');
const router = express.Router();

const MatricoleController = require('./../controllers/matricole.server.controller');

// const passport = require('passport');

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }), UtentiController.get);

router.post('/', MatricoleController.create); // C
router.get('/', MatricoleController.get); // R
// router.put('/', UtentiController.update); // U
// router.delete('/', UtentiController.remove); // D
// router.post('/login', UtentiController.login);

module.exports = router;