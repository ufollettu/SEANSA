const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

const repository = require("../repositories/utenti.server.repository");

//Create a passport middleware to handle user registration
passport.use("signup", new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async (req, username, password, next) => {
    bcrypt.hash(password, 10, (err, hash) => {
      // Store hash in your password DB.
      repository.findOne(username).then(user => {
        if (user) {
          return next(null, false, {
            message: "That username is already taken"
          });
        } else {
          const data = {
            SU_UNA: username,
            SU_PAW: hash,
            SU_LAST_LOGIN: new Date(),
            SU_CREATION: new Date(),
            SU_LAST_EDIT: new Date(),
            SU_DELETED: req.body.deleted,
            SU_LAST_IP: req.body.lastIp
          };
          //Save the information provided by the user to the the database
          return repository.create(data).then(user => {
            user ? next(null, user) : next(null, false);
          })
            .catch(err => next(err));
        }
      });
    });
  }
)
);

// change Password
passport.use("changepwd", new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async (req, username, password, next) => {
    bcrypt.hash(password, 10, (err, hash) => {
      // Store hash in your password DB.
      repository.findOne(username).then(user => {
        if (!user) {
          return next(null, false, {
            message: "username does not exists"
          });
        } else {
          const newData = {
            SU_UNA: username,
            SU_PAW: hash,
            SU_LAST_EDIT: new Date()
          };
          // Update finded user
          return user.update(newData).then(updatedUser => {
            updatedUser ? next(null, updatedUser) : next(null, false);
          })
            .catch(err => next(err));
        }
      });
    });
  }
)
);

// handle login logic
passport.use("login", new LocalStrategy({
  usernameField: "username",
  passwordField: "password"
  // passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async (username, password, next) => {
    const isValidPassword = (userpass, password) => {
      return bcrypt.compareSync(password, userpass);
    };
    repository.findOne(username).then(user => {
      if (!user) {
        return next(null, false, { message: "User not found" });
      }
      if (!isValidPassword(user.SU_PAW, password)) {
        return next(null, false, { message: "Wrong Password" });
      }
      // Send the user information to the next middleware
      return next(null, user, { message: "Logged In Successfully" });
    })
      .catch(err => next(err));
  }
)
);

// jwt check for middleware (not using yet)
passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  // find the user in db if needed.
  // This functionality may be omitted if you store everything you'll need in JWT payload.
  console.log("payload received", jwt_payload);
  return repository.findById(jwt_payload).then(user => {
    user ? next(null, user) : next(null, false);
  })
    .catch(err => next(err));
})
);
