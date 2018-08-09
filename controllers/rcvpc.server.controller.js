const pcRepo = require("../repositories/pc.server.repository");
const repository = require('../repositories/rcvpc.server.repository');
const codeToGod = require('../middleware').codeToGod;
const decodeToMortal = require('../middleware').decodeToMortal;


// List
// const list = async (req, res) => {
// repository.findAll()
//   .then(rinnovi => {
//     res.json(rinnovi);
//   }).catch(err => res.send(err.errors));
// };
// module.exports.list = list;

// Create
const create = async (req, res) => {
  const key = req.body.key;
  const hwId = req.body.hwId;
  repository.findOem(key, hwId).then((Oem) => {
    if (Oem[0]) {
      res.json(Oem[0]);
    } else {
      throw new Error('key not exists')
    }
  }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const license = req.params.license;
  const today = new Date().toISOString().slice(0, 10);
  repository.findLicense(license).then(key => {
    if (key[0]) {
      if (!key[0]['SP_HW_ID']) {
        throw new Error('key virgin')
      } else if (key[0]['SS_STATUS'] < 1) {
        throw new Error('key not allowed')
      } else if (key[0]['SS_EXPIRE'] < today) {
        throw new Error('key expired')
      } else {
        pcRepo.findOne(key[0]['SP_HW_ID'])
          .then(hwid => {
            if (hwid) {
              res.json(key);
            } else {
              throw new Error('pc banned')
            }
          })
        // TODO update pc rx date
      }
    } else {
      throw new Error('key not exists')
    }
  }).catch(err => res.send(err.message));
};
module.exports.show = show;

// Update
const update = async (req, res) => {
  // const id = req.params.id;
  // const newData = req.body;
  // repository.findById(id)
  //   .then(rinnovo => {
  //     return rinnovo.update(newData).then((self) => {
  //       res.json(self);
  //     })
  //   }).catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
  // const id = req.params.id;
  // repository.destroy(id)
  //   .then(rinnovo => {
  //     res.json(rinnovo)
  //   }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;