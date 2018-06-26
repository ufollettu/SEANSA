var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.sks.findAll()
        .then(sks => {
            res.json(sks);
        }).catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
const add = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('add new item page');
    // res.render('/new');
};
module.exports.add = add;

// Create
const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = {
        SS_KEY: req.body.key,
        SS_OEM: req.body.oem,
        SS_ACTIVATION_DATE: req.body.activationDate,
        SS_EXPIRE: req.body.expire,
        SS_CREATED: req.body.created,
        SS_LAST_EDIT: req.body.lastEdit,
        SS_MISMATCH_COUNT: req.body.mismatchCount,
        SS_STATUS: req.body.status,
        SS_SC_ID: req.body.scId,
        SS_SP_ID: req.body.spId,
        SS_ACTIVATED_BY: req.body.activatedBy,
        SS_ACTIVATION_REFERENT: req.body.activationReferent
    };

    db.sks.create(data).then(function () {
        res.send('sks creato');
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.sks.findById(id)
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
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SS_KEY: req.body.key,
        SS_OEM: req.body.oem,
        SS_ACTIVATION_DATE: req.body.activationDate,
        SS_EXPIRE: req.body.expire,
        SS_CREATED: req.body.created,
        SS_LAST_EDIT: req.body.lastEdit,
        SS_MISMATCH_COUNT: req.body.mismatchCount,
        SS_STATUS: req.body.status,
        SS_SC_ID: req.body.scId,
        SS_SP_ID: req.body.spId,
        SS_ACTIVATED_BY: req.body.activatedBy,
        SS_ACTIVATION_REFERENT: req.body.activationReferent
    };

    db.sks.update(newData, {
            returning: true,
            where: {
                SS_ID: id
            }
        })
        .then((sks) => {
            res.send(`updated sks id: ${id}. New data is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.sks.destroy({
            where: {
                SS_ID: id
            }
        })
        .then(pc => {
            res.send(`removed sks id: ${id}`);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;