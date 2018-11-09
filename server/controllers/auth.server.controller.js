const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require('nodemailer');
const secretOrKey = CONFIG.jwt_encryption;
const expireDate = CONFIG.jwt_expiration;
const adminIds = Array.from(CONFIG.adminIds.split("|"));
const permRepository = require('../repositories/utenti-permessi.server.repository');
const customizationRepo = require('../repositories/customization.server.repository');
const utentiRepo = require('../repositories/utenti.server.repository');

const signup = async (req, res, next) => {
  passport.authenticate("signup", { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(422).json({
        message: info ? info.message : "Signup failed",
        user: user
      });
    }
    findUser(user, res);
    // set default style and logo
    const defaultStyle = {
      'SCZ_SU_ID': user.SU_ID
    }
    customizationRepo.create(defaultStyle).then(style => {
      // console.log(style)
    });
  }
  )(req, res, next);
};

module.exports.signup = signup;

const changepwd = async (req, res, next) => {
  console.log(req.userId);
  passport.authenticate("changepwd", { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(422).json({
        message: info ? info.message : "changing password failed",
        user: user
      });
    }
    findUser(user, res);
  }
  )(req, res, next);
};

module.exports.changepwd = changepwd;

const signin = async (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(422).json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }
    findUser(user, res);
  }
  )(req, res, next);
};

module.exports.signin = signin;

const forgot = async (req, res, next) => {

  utentiRepo.findOne(req.body.username).then((user) => {
    if (!user) {
      return res.status(422).json({
        message: "usename does not exists",
      });
    }

    // Change in production
    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PWD
      }
    });

    var mailOptions = {
      from: user.SU_UNA, // sender address
      to: "pasquale.merolle@gmail.com", // list of receivers
      subject: "Username " + user.SU_UNA + " - Forgot Superactivator Pwd", // Subject line
      html: '<p>I forgot my Superactivator password, please <a href="http://localhost:4200/#/utenti-resetpwd/' + user.SU_ID + '">reset</a> Username: ' + user.SU_UNA + '</p>'
    }

    // send mail with defined transport object
    transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        res.json(error)
      } else {
        res.json(response.message)
      }
      // if you don't want to use this transport object anymore, uncomment following line
      transport.close(); // shut down the connection pool, no more messages
    });
  })
}
module.exports.forgot = forgot;

function findUser(user, res) {
  return permRepository.findByUsername(user.SU_ID).then((keys) => {
    const perms = keys.map((key, index) => {
      return key.UP_P_ID;
    });

    const payload = {
      "userId": user.SU_ID,
      "permArr": perms,
      "isAdmin": adminIds.includes((user.SU_ID).toString()) ? true : false
    };
    const token = jwt.sign(payload, secretOrKey, { expiresIn: expireDate });
    return res.status(200).json({
      message: "Login successful",
      user: user,
      idToken: token,
      expiresIn: expireDate
    });
  });
}