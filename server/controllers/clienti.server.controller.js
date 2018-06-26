var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.clienti.findAll()
        .then(clienti => {
            res.json(clienti);
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
        SC_NOME: req.body.nome,
        SC_PIVA: req.body.pIva,
        SC_COD_FISCALE: req.body.codFiscale,
        SC_INDIRIZZO: req.body.indirizzo,
        SC_EMAIL: req.body.email,
        SC_TELEFONO: req.body.telefono,
        SC_REFERENTE_NOME: req.body.referenteNome,
        SC_TEL_REFERENTE: req.body.telReferente,
        SC_TS: req.body.ts,
        SC_DELETED: req.body.deleted
    };

    db.clienti.create(data).then(function () {
        // res.send('utente creato' + data.SU_ID);
        res.json(data);
    }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.clienti.findById(id)
        .then(cliente => {
            res.json(cliente);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.clienti.findById(id)
        .then(cliente => {
            res.send("edit page");
            // res.render("/edit", {cliente: cliente});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SC_NOME: req.body.nome,
        SC_PIVA: req.body.pIva,
        SC_COD_FISCALE: req.body.codFiscale,
        SC_INDIRIZZO: req.body.indirizzo,
        SC_EMAIL: req.body.email,
        SC_TELEFONO: req.body.telefono,
        SC_REFERENTE_NOME: req.body.referenteNome,
        SC_TEL_REFERENTE: req.body.telReferente,
        SC_TS: req.body.ts,
        SC_DELETED: req.body.deleted
    };

    db.clienti.update(newData, {
            returning: true,
            where: {
                SC_ID: id
            }
        })
        .then((clienti) => {
            res.send(`updated cliente id: ${id}. New data is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.clienti.destroy({
            where: {
                SC_ID: id
            }
        })
        .then(pc => {
            res.send(`removed cliente id: ${id}`);
        }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;