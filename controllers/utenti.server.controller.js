const repository = require('../repositories/utenti.server.repository');

// List
const list = async (req, res) => {
    repository.findAll()
        .then(utenti => {
            res.json(utenti);
        }).catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
const add = async (req, res) => {
    res.send('add new item page');
};
module.exports.add = add;

// Create
/* Create is now managed by auth/signup route. */
const create = async (req, res) => {
    const data = req.body;
    repository.create(data)
        .then((utente) => {
            res.json(utente);
        }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    const id = req.params.id;
    repository.findById(id)
        .then(utente => {
            res.json(utente);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    repository.findById(id)
        .then(utente => {
            res.send("edit page");
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    repository.findById(id)
        .then(utente => {
            return utente.update(newData).then((self) => {
                res.json(self);
            });
        }).catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    const id = req.params.id;
    repository.destroy({
        where: {
            SU_ID: id
        }
    })
        .then(utente => {
            res.json(utente);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
