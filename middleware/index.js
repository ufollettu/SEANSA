const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('no header request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    console.log('null');
    return res.status(401).send('null token request');
  }
  const jwtPayload = jwt.verify(token, CONFIG.jwt_encryption);
  if (!jwtPayload) {
    return res.status(401).send('token not match request');
  }
  req.userId = jwtPayload;
  // req.user.SU_ID = jwtPayload;

  console.log(`User id: ${jwtPayload}`);
  next();
}

function roleAuthorization(roles) {
  // return function (req, res, next) {

  //   // change
  //   var user = req.user;

  //   // change
  //   User.findById(user._id, function (err, foundUser) {

  //     if (err) {
  //       res.status(422).json({ error: 'No user found.' });
  //       return next(err);
  //     }

  //     if (roles.indexOf(foundUser.role) > -1) {
  //       return next();
  //     }

  //     res.status(401).json({ error: 'You are not authorized to view this content' });
  //     return next('Unauthorized');

  //   });

  // }
}

module.exports = {
  verifyToken,
  roleAuthorization
};

// TODO add guard to prevent unauthorized uses to non SU users