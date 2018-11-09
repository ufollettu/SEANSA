const repository = require("../repositories/utenti-permessi.server.repository");
const user_repo = require("../repositories/utenti.server.repository");

// List
const list = async (req, res) => {
  repository
    .findAll()
    .then(result => {
      res.json(result);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// Create
const create = async (req, res) => {
  const data = req.body;
  user_repo.findById(req.body.UP_U_ID).then(utente => {
    // create a new permission association
    repository
      .create(data)
      .then(result => {
        res.json(result);
      })
      .catch(err => res.send(err.errors));
  });
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const userId = req.params.id;
  repository
    .findByUsername(userId)
    .then(key => {
      res.json(key);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Update
const update = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  repository
    .bulkDestroy(userId)
    .then(affectedRows => {
      return repository.bulkCreate(newData).then(result => {
        res.json(result);
      });
    })
    .catch(err => res.send(err.errors));
};
module.exports.update = update;

// // Destroy
// const destroy = async (req, res) => {
//     const id = req.params.id;
//     repository.destroy(id).then(affectedRows => {
//         res.status(200).send(`destroyed ${affectedRows} rows`);
//     }).catch(err => res.send(err.errors));
// };
// module.exports.destroy = destroy;
