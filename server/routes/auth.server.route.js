const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require("passport");
// const secretOrKey = CONFIG.jwt_encryption;

const authController = require("../controllers/auth.server.controller");
const verifyToken = require("../middleware").verifyToken;
const can = require("../middleware").can;

// router.get('/signin', authController.signinPage);
// router.get('/signup', authController.signupPage);
// router.get("/changepwd", authController.changePwdPage);
router.put("/changepwd", authController.changepwd);
// router.post('/signup', passport.authenticate('signup', { session: false }), authController.signup);

router.post("/signin", authController.signin);
// router.post('/signup', authController.signup);
// router.post('/logout', authController.logout);
router.post("/forgot", authController.forgot);

module.exports = router;
