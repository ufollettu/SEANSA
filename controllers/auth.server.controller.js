const jwt = require("jsonwebtoken");
const passport = require("passport");
const secretOrKey = CONFIG.jwt_encryption;
const expireDate = CONFIG.jwt_expiration;

const signupPage = async (req, res) => {
  res.send("signup");
};

module.exports.signupPage = signupPage;

const signinPage = async (req, res) => {
  res.send("signin");
};

module.exports.signinPage = signinPage;

const signup = async (req, res, next) => {
  passport.authenticate("signup", { session: false }, async (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Signup failed",
          user: user
        });
      }
      return res.status(200).json({
        message: "Signup successful",
        user: user
      });
    }
  )(req, res, next);
};

module.exports.signup = signup;

const signin = async (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
      if(err)
        return next(err);
      if (!user) {
        return res.status(422).json({
          message: info ? info.message : "Login failed",
          user: user
        });
      }
      const token = jwt.sign(user.SU_ID, secretOrKey);
      return res.status(200).json({
        user: user,
        idToken: token,
        expiresIn: expireDate
      });
    }
  )(req, res, next);
};

module.exports.signin = signin;

const logout = async () => {
  // we need to destroy token in client end!!
};

module.exports.logout = logout;
