const repository = require("../repositories/customization.server.repository");
const stream = require("stream");
const fs = require("fs");
const path = require("path");

// List
const list = async (req, res) => {
  // repository.findAll()
  repository
    .findAll()
    .then(styles => {
      res.json(styles);
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
  if (req.file) {
    data.SCZ_LOGO_MIMETYPE = req.file.mimetype;
    data.SCZ_LOGO_NAME = req.file.filename;
  }
  repository
    .create(data)
    .then(style => {
      res.json(style);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
  const userId = req.params.id;
  repository
    .findOne(userId)
    .then(logo => {
      res.json(logo);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
// const edit = async (req, res) => {
//     const id = req.params.id;
//     repository.findById(id)
//         .then(style => {
//             res.send("edit page");
//         }).catch(err => res.send(err.errors));
// };

// module.exports.edit = edit;

// Update
const update = async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;
  if (req.file) {
    newData.SCZ_LOGO_MIMETYPE = req.file.mimetype;
    newData.SCZ_LOGO_NAME = req.file.filename;
  }
  repository
    .findOne(userId)
    .then(style => {
      const oldLogoPath =
        global.__basedir + "/src/assets/images/" + style["SCZ_LOGO_NAME"];
      const defaultLogoPath =
        global.__basedir + "/src/assets/images/raniero.png";

      return style.update(newData).then(self => {
        if (oldLogoPath !== defaultLogoPath) {
          fs.exists(oldLogoPath, function(exists) {
            if (exists) {
              fs.unlink(oldLogoPath, err => {
                if (err) throw err;
                console.log(`${oldLogoPath} was deleted`);
              });
            }
          });
        }
        res.json(self);
      });
    })
    .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
// const destroy = async (req, res) => {
//     const id = req.params.id;
//     repository.destroy(id)
//         .then(style => {
//             res.json(style);
//         }).catch(err => res.send(err.errors));
// };

// module.exports.destroy = destroy;

// module.exports.setDelete = setDelete;
