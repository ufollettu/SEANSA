const repository = require("../repositories/clienti.server.repository");

// List
const list = async (req, res) => {
  const allRes = req.isAdmin
    ? repository.findNotDeleted()
    : repository.findNotDeletedByCreatorId(req.userId);

  allRes
    .then(clienti => {
      res.json(clienti);
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
  data["SC_CREATOR_ID"] = req.userId;
  repository
    .create(data)
    .then(customer => {
      res.json(customer);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(cliente => {
      res.json(cliente);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(cliente => {
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
    .then(cliente => {
      return cliente.update(newData).then(self => {
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
    .then(cliente => {
      res.json(cliente);
    })
    .catch(err => res.send(err.errors));
};

module.exports.destroy = destroy;

// // set deleted value = 1
// const setDelete = async (req, res) => {
//     const id = req.params.id;
//     const newData = req.body;
//     repository.findById(id)
//         .then(cliente => {
//             return cliente.update(newData).then((self) => {
//                 res.json(self);
//             });
//         }).catch(err => res.send(err.errors));
// };

// module.exports.setDelete = setDelete;
