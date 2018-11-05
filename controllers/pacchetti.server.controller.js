const repository = require("../repositories/pacchetti.server.repository");
const moment = require("moment");

// List
const list = async (req, res) => {
  const allRes = req.isAdmin
    ? repository.findAll()
    : repository.findByCreatorId(req.userId);

  allRes
    .then(packs => {
      res.json(packs);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// Create
const create = async (req, res) => {
  const data = {
    SPK_SU_CREATOR_ID: req.userId,
    SPK_SU_OWNER_ID: req.body.SPK_SU_OWNER_ID,
    SPK_CREATED: moment().format("YYYY-MM-DD hh:mm:ss"),
    SPK_EXPIRE: req.body.SPK_EXPIRE,
    SPK_SKS_COUNT: req.body.SPK_SKS_COUNT
  };

  repository
    .create(data)
    .then(pack => {
      res.json(pack);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(pack => {
      res.json(pack);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

const showByUserId = async (req, res) => {
  const id = req.params.id;
  repository
    .findByOwnerId(id)
    .then(pack => {
      res.json(pack);
    })
    .catch(err => res.send(err.errors));
};
module.exports.showByUserId = showByUserId;

// Update
const update = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  repository
    .findById(id)
    .then(pack => {
      return pack.update(newData).then(self => {
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
    .then(pack => {
      res.json(pack);
    })
    .catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
