const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('no header request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    console.log('null');
    return res.status(401).send('null token request');
  }
  const jwtPayload = jwt.verify(token, CONFIG.jwt_encryption);
  if (!jwtPayload) {
    return res.status(401).send('token not match request');
  }
  req.userId = jwtPayload;
  // req.user.SU_ID = jwtPayload;

  console.log(jwtPayload);
  next();
}

module.exports = {
  verifyToken
};

// TODO add guard to prevent unauthorized uses to non SU users