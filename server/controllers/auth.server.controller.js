const jwt = require('jsonwebtoken');
const passport = require("passport");
const secretOrKey = CONFIG.jwt_encryption;

const signupPage = async (req, res) => {
    res.send('signup');
}

module.exports.signupPage = signupPage;

const signinPage = async (req, res) => {
    res.send('signin');
}

module.exports.signinPage = signinPage;

const signup = async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}

module.exports.signup = signup;

const signin = async (req, res, next) => {
    passport.authenticate('login', { session: false }, async (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }
        req.login(user, { session: false }, async (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.SU_ID, secretOrKey);
            return res.json({ user, token });
        });
    })(req, res, next);
}

module.exports.signin = signin;

const logout = async () => {
    // we need to destroy token in client end!!
}

module.exports.logout = logout;