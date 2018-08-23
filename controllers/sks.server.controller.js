const repository = require('../repositories/sks.server.repository');
const randomPassword = require('../helpers/pwd-generator');

// List
const list = async (req, res) => {
    repository.findAll()
        .then(sks => {
            res.json(sks);
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
    const data = {
        'SS_KEY': randomPassword(25),
        'SS_OEM': req.body.SS_OEM,
        'SS_CREATED': new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2'),
        'SS_EXPIRE': req.body.SS_EXPIRE,
        'SS_SC_ID': req.body.SS_SC_ID,
        'SS_ACTIVATED_BY': '',
        'SS_ACTIVATION_REFERENT': ''
    }

    repository.create(data).then((sks) => {
        res.json(sks);
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    const id = req.params.id;
    repository.findById(id)
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
// const edit = async (req, res) => {
//     const id = req.params.id;
//     repository.findById(id)
//         .then(sks => {
//             res.send("edit page");
//         }).catch(err => res.send(err.errors));
// };

// module.exports.edit = edit;

// Update
const update = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    repository.findById(id)
        .then(sks => {
            return sks.update(newData).then((self) => {
                res.json(self);
            });
        }).catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    const id = req.params.id;
    repository.destroy(id)
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
