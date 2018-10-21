const repository = require("../repositories/rinnovi.server.repository");

// List
const list = async (req, res) => {
  const allRes = req.isAdmin
    ? repository.findAll()
    : repository.findAllByCreatorId(req.userId);

  allRes
    .then(rinnovi => {
      res.json(rinnovi);
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
  data["SR_CREATOR_ID"] = req.userId;
  repository
    .create(data)
    .then(rinnovo => {
      res.json(rinnovo);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(rinnovo => {
      res.json(rinnovo);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(rinnovo => {
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
    .then(rinnovo => {
      return rinnovo.update(newData).then(self => {
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
    .then(rinnovo => {
      res.json(rinnovo);
    })
    .catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
