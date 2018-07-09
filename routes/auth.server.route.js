const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const passport = require("passport");
// const secretOrKey = CONFIG.jwt_encryption;

const authController = require('../controllers/auth.server.controller');

router.get('/signin', authController.signinPage);
router.get('/signup', authController.signupPage);

router.post('/signin', authController.signin);
router.post('/signup', passport.authenticate('signup', { session: false }), authController.signup);

router.post('/logout', authController.logout);

module.exports = router;