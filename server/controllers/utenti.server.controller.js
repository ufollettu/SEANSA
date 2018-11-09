const repository = require("../repositories/utenti.server.repository");
const bcrypt = require("bcryptjs");

// List
const list = async (req, res) => {
  const allRes = req.isAdmin
    ? repository.findNotDeleted()
    : repository.findNotDeletedByCreatorId(req.userId);

  allRes
    .then(utenti => {
      res.json(utenti);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
const add = async (req, res) => {
  res.send("add new item page");
};
module.exports.add = add;

// Create
const create = async (req, res) => {
  const data = req.body;
  const username = data.SU_UNA;
  const password = data.SU_PAW;

  bcrypt.hash(password, 10, (err, hash) => {
    // Store hash in your password DB.
    repository.findOne(username).then(user => {
      if (user) {
        res.status(422).json({ message: "username is already taken" });
      } else {
        const data = {
          SU_UNA: username,
          SU_PAW: hash,
          SU_LAST_LOGIN: new Date(),
          SU_CREATION: new Date(),
          SU_LAST_EDIT: new Date(),
          SU_CREATOR_ID: req.userId,
          SU_DELETED: req.body.deleted,
          SU_LAST_IP: req.body.lastIp
        };
        //Save the information provided by the user to the the database
        repository
          .create(data)
          .then(utente => {
            res.json(utente);
          })
          .catch(err => res.send(err.errors));
      }
    });
  });
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(utente => {
      res.json(utente);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(utente => {
      res.send("edit page");
    })
    .catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
// const update = async (req, res) => {
//     const id = req.params.id;
//     const newData = req.body;
//     repository.findById(id)
//         .then(utente => {
//             return utente.update(newData).then((self) => {
//                 res.json(self);
//             });
//         }).catch(err => res.send(err.errors));
// };
// module.exports.update = update;

// Update
const update = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const username = newData.SU_UNA;
  const password = newData.SU_PAW;
  const level = newData.SU_LEVEL;

  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      // Store hash in your password DB.
      repository
        .findById(id)
        .then(utente => {
          const data = {
            SU_UNA: username,
            SU_PAW: hash,
            SU_LAST_EDIT: new Date()
          };
          //Save the information provided by the user to the the database
          return utente.update(data).then(self => {
            res.json(self);
          });
        })
        .catch(err => res.send(err.errors));
    });
  } else if (level) {
    repository
      .findById(id)
      .then(utente => {
        const data = {
          SU_UNA: username,
          SU_LEVEL: level.name,
          SU_LAST_EDIT: new Date()
        };
        //Save the information provided by the user to the the database
        return utente.update(data).then(self => {
          res.json(self);
        });
      })
      .catch(err => res.send(err.errors));
  } else {
    repository
      .findById(id)
      .then(utente => {
        return utente.update(newData).then(self => {
          res.json(self);
        });
      })
      .catch(err => res.send(err.errors));
  }
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
  const id = req.params.id;
  repository
    .destroy(id)
    .then(utente => {
      res.json(utente);
    })
    .catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
