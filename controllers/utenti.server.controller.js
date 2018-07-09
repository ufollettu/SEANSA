var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.utenti.findAll()
        .then(utenti => {
            res.json(utenti);
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
/* Create is now managed by auth/signup route. */
const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = {
        SU_UNA: req.body.una,
        SU_PAW: req.body.paw,
        SU_LEVEL: req.body.level,
        SU_LAST_LOGIN: req.body.lastLogin,
        SU_CREATION: req.body.creation,
        SU_LAST_EDIT: req.body.lastEdit,
        SU_DELETED: req.body.deleted,
        SU_LAST_IP: req.body.lastIp
    };

    db.utenti.create(data).then(function () {
        // res.send('utente creato' + data.SU_ID);
        res.json(data);
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.utenti.findById(id)
        .then(utente => {
            res.json(utente);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.utenti.findById(id)
        .then(utente => {
            res.send("edit page");
            // res.render("/edit", {utente: utente});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SU_UNA: req.body.una,
        SU_PAW: req.body.paw,
        SU_LEVEL: req.body.level,
        SU_LAST_LOGIN: req.body.lastLogin,
        SU_CREATION: req.body.creation,
        SU_LAST_EDIT: req.body.lastEdit,
        SU_DELETED: req.body.deleted,
        SU_LAST_IP: req.body.lastIp
    };

    db.utenti.update(newData, {
            returning: true,
            where: {
                SU_ID: id
            }
        })
        .then((utenti) => {
            res.send(`updated utente id: ${id}. New data is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.utenti.destroy({
            where: {
                SU_ID: id
            }
        })
        .then(pc => {
            res.send(`removed utente id: ${id}`);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;