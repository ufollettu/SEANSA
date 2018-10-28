const repository = require("../repositories/pacchetti-history.server.repository");
const moment = require("moment");

// List
const list = async (req, res) => {
  repository
    .findAll()
    .then(packs => {
      res.json(packs);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// Create
const create = async (req, res) => {
  const data = {
    SPKH_SPK_ID: req.body.SPKH_SPK_ID,
    SPKH_SU_ID: req.body.SPKH_SU_ID,
    SPKH_SS_ID: req.body.SPKH_SS_ID,
    SPKH_ACTION: req.body.SPKH_ACTION,
    SPKH_TS: moment().format("YYYY-MM-DD hh:mm:ss")
  };

  repository
    .create(data)
    .then(sks => {
      res.json(sks);
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
