const express = require('express');
const router = express.Router();

const RinnoviController = require('./../controllers/rinnovi.server.controller');

// const passport = require('passport');

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }), UtentiController.get);

router.post('/', RinnoviController.create); // C
router.get('/', RinnoviController.get); // R
// router.put('/', UtentiController.update); // U
// router.delete('/', UtentiController.remove); // D
// router.post('/login', UtentiController.login);

module.exports = router;