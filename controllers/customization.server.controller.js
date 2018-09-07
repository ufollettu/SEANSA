const repository = require('../repositories/customization.server.repository');
const stream = require('stream');

// List
const list = async (req, res) => {
    // repository.findAll()
    repository.findAll()
        .then(styles => {
            res.json(styles);
        }).catch(err => res.send(err.errors));
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
        data.SCZ_LOGO_PATH = req.file.path;
        data.SCZ_LOGO_MIMETYPE = req.file.mimetype;
        data.SCZ_LOGO_NAME = req.file.filename;
    }
    repository.create(data).then((style) => {
        res.json(style);
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    const userId = req.params.id;
    repository.findOne(userId)
        .then(logo => {
            res.json(logo);
        }).catch(err => res.send(err.errors));
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
    const id = req.params.id;
    const newData = req.body;
    repository.findById(id)
        .then(style => {
            return style.update(newData).then((self) => {
                res.json(self);
            });
        }).catch(err => res.send(err.errors));
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