const repository = require("../repositories/matricole.server.repository");

// List
const list = async (req, res) => {
  repository
    .findAll()
    .then(matricole => {
      res.json(matricole);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
// const add = async (req, res) => {
//     res.send('add new item page');
// };
// module.exports.add = add;

// Create
const create = async (req, res) => {
  const data = req.body;
  repository
    .create(data)
    .then(matricola => {
      res.json(matricola);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const sksId = req.params.sksId;
  repository
    .findAllBySks(sksId)
    .then(matricole => {
      res.json(matricole);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(matricola => {
      res.send("edit page");
    })
    .catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  repository
    .findById(id)
    .then(matricola => {
      return matricola.update(newData).then(self => {
        res.json(self);
      });
    })
    .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
  const id = req.params.id;
  repository
    .destroy(id)
    .then(matricola => {
      res.json(matricola);
    })
    .catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
