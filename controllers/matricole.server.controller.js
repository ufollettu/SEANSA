var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.matricole.findAll()
        .then(matricoles => {
            res.json(matricoles);
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
        SM_MATRICOLA: req.body.matricola,
        SM_SS_ID: req.body.ssId,
        SM_DETTAGLI: req.body.dettagli,
        SM_CREATION_DATE: req.body.creationDate,
        SM_LAST_UPDATE: req.body.lastUpdate,
    };

    db.matricole.create(data).then(function () {
        res.send('matricola creata');
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.matricole.findById(id)
        .then(matricola => {
            res.json(matricola);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.matricole.findById(id)
        .then(matricola => {
            res.send("edit page");
            // res.render("/edit", {matricola: matricola});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SM_MATRICOLA: req.body.matricola,
        SM_SS_ID: req.body.ssId,
        SM_DETTAGLI: req.body.dettagli,
        SM_CREATION_DATE: req.body.creationDate,
        SM_LAST_UPDATE: req.body.lastUpdate,
    };

    db.matricole.update(newData, {
            returning: true,
            where: {
                sm_id: id
            }
        })
        .then((matricola) => {
            res.send(`updated matricola id: ${id}. New data is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.matricole.destroy({
            where: {
                sm_id: id
            }
        })
        .then(pc => {
            res.send(`removed matricola id: ${id}`);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;