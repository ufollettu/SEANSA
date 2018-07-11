const repository = require('../repositories/sks.server.repository');

// List
const list = async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    repository.findAll()
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
const add = async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send('add new item page');
    // res.render('/new');
};
module.exports.add = add;

// Create
const create = async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    const data = req.body;
    // const data = {
    //     SS_KEY: req.body.key,
    //     SS_OEM: req.body.oem,
    //     SS_ACTIVATION_DATE: req.body.activationDate,
    //     SS_EXPIRE: req.body.expire,
    //     SS_CREATED: req.body.created,
    //     SS_LAST_EDIT: req.body.lastEdit,
    //     SS_MISMATCH_COUNT: req.body.mismatchCount,
    //     SS_STATUS: req.body.status,
    //     SS_SC_ID: req.body.scId,
    //     SS_SP_ID: req.body.spId,
    //     SS_ACTIVATED_BY: req.body.activatedBy,
    //     SS_ACTIVATION_REFERENT: req.body.activationReferent
    // };

    repository.create(data).then((sks) => {
        res.json(sks);
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    repository.findById(id)
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.sks.findById(id)
        .then(sks => {
            res.send("edit page");
            // res.render("/edit", {sks: sks});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = req.body;
    // const newData = {
    //     SS_KEY: req.body.key,
    //     SS_OEM: req.body.oem,
    //     SS_ACTIVATION_DATE: req.body.activationDate,
    //     SS_EXPIRE: req.body.expire,
    //     SS_CREATED: req.body.created,
    //     SS_LAST_EDIT: req.body.lastEdit,
    //     SS_MISMATCH_COUNT: req.body.mismatchCount,
    //     SS_STATUS: req.body.status,
    //     SS_SC_ID: req.body.scId,
    //     SS_SP_ID: req.body.spId,
    //     SS_ACTIVATED_BY: req.body.activatedBy,
    //     SS_ACTIVATION_REFERENT: req.body.activationReferent
    // };

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
    // res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    repository.destroy({
            where: {
                SS_ID: id
            }
        })
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;