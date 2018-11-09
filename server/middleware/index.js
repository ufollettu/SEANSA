const jwt = require("jsonwebtoken");
const users_permissions_repo = require("../repositories/utenti-permessi.server.repository");
const user_repo = require("../repositories/utenti.server.repository");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("no header request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    console.log("null");
    return res.status(401).send("null token request");
  }
  const jwtPayload = jwt.verify(token, CONFIG.jwt_encryption);
  if (!jwtPayload) {
    return res.status(401).send("token not match request");
  }
  req.userId = jwtPayload.userId;
  req.permString = jwtPayload.permArr;
  req.isAdmin = jwtPayload.isAdmin;

  console.log(`User is Admin? ${jwtPayload.isAdmin}`);
  console.log(`User id from jwt: ${jwtPayload.userId}`);
  console.log(`Permission string from jwt: ${jwtPayload.permArr}`);
  console.log(jwtPayload.permArr);

  next();
}

function adminCheck() {
  return (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      throw new Error("Solo l'amministratore può accedere a questa risorsa");
    }
  };
}

function can(permissionId, userId) {
  return (req, res, next) => {
    userId = req.userId || userId;
    console.log(`permission Id: ${permissionId}`);
    console.log(`user Id: ${userId}`);

    // call the db: here we using a repo with sequelize ORM
    users_permissions_repo
      .findOne(userId, permissionId)
      .then(res => {
        if (!res) {
          throw new Error("non hai il permesso per utilizzare questa risorsa");
        } else if (res) {
          next();
        }
      })
      .catch(err => {
        res.status(401).send(err.message);
      });
  };
}

function allow(permissionId, userId) {
  return (req, res, next) => {
    const data = req.body || { UP_U_ID: userId, UP_P_ID: permissionId } || {};
    // call the db: here we using a repo with sequelize ORM
    user_repo.findById(userId).then(utente => {
      // create a new permission association
      users_permissions_repo
        .create(data)
        .then(result => {
          // res.json(result);
          next();
        })
        .catch(err => res.send(err.errors));
    });
  };
}

function disallow(permissionId, userId) {
  return (req, res, next) => {
    const data = req.body || { UP_U_ID: userId, UP_P_ID: permissionId } || {};
    // call the db: here we using a repo with sequelize ORM
    user_repo.findById(userId).then(utente => {
      // delete a founded permission association
      users_permissions_repo
        .destroy(data)
        .then(affectedRows => {
          // console.log(result); // no result!
          // res.status(200).send(`destroyed ${affectedRows} rows` );
          next();
        })
        .catch(err => res.send(err.errors));
    });
  };
}

module.exports = {
  verifyToken,
  can,
  adminCheck,
  allow,
  disallow
};
