const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, cb) {
        return db.utenti.findOne({
            where: {
                SU_UNA: username,
                SU_PAW: password,
            }
        })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.secret
},
    function (jwtPayload, cb) {
        return db.utenti.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));