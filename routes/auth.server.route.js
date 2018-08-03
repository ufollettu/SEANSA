const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require("passport");
// const secretOrKey = CONFIG.jwt_encryption;

const authController = require('../controllers/auth.server.controller');
const verifyToken = require('../middleware').verifyToken;
const can = require('../middleware').can;


// router.get('/signin', authController.signinPage);
// router.get('/signup', authController.signupPage);
// router.get('/changepwd', authController.changePwdPage);

// router.post('/signup', passport.authenticate('signup', { session: false }), authController.signup);

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.put('/changepwd', verifyToken, can(1), authController.changepwd);

// router.post('/logout', authController.logout);

module.exports = router;
