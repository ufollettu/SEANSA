var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.rinnovi.findAll()
        .then(rinnovis => {
            res.json(rinnovis);
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
        SR_SS_ID: req.body.ssId,
        SR_TS: req.body.ts,
    };

    db.rinnovi.create(data).then(function () {
        res.send('rinnovo creato');
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.rinnovi.findById(id)
        .then(rinnovo => {
            res.json(rinnovo);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.rinnovi.findById(id)
        .then(rinnovo => {
            res.send("edit page");
            // res.render("/edit", {rinnovo: rinnovo});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SR_SS_ID: req.body.ssId,
        SR_TS: req.body.ts,
    };

    db.rinnovi.update(newData, {
            returning: true,
            where: {
                SR_ID: id
            }
        })
        .then((rinnovo) => {
            res.send(`updated rinnovo id: ${id}. New data is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.rinnovi.destroy({
            where: {
                SR_ID: id
            }
        })
        .then(pc => {
            res.send(`removed rinnovo id: ${id}`);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;