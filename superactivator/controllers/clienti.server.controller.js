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
    const data = req.body;
    // const data = {
    //     SC_NOME: req.body.nome,
    //     SC_PIVA: req.body.pIva,
    //     SC_COD_FISCALE: req.body.codFiscale,
    //     SC_INDIRIZZO: req.body.indirizzo,
    //     SC_EMAIL: req.body.email,
    //     SC_TELEFONO: req.body.telefono,
    //     SC_REFERENTE_NOME: req.body.referenteNome,
    //     SC_TEL_REFERENTE: req.body.telReferente,
    //     SC_TS: req.body.ts,
    //     SC_DELETED: req.body.deleted
    // };

    db.clienti.create(data).then((customer) => {
        res.json(customer);
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
    const newData = req.body;
    // const newData = {
    //     SC_NOME: req.body.nome,
    //     SC_PIVA: req.body.pIva,
    //     SC_COD_FISCALE: req.body.codFiscale,
    //     SC_INDIRIZZO: req.body.indirizzo,
    //     SC_EMAIL: req.body.email,
    //     SC_TELEFONO: req.body.telefono,
    //     SC_REFERENTE_NOME: req.body.referenteNome,
    //     SC_TEL_REFERENTE: req.body.telReferente,
    //     SC_TS: req.body.ts,
    //     SC_DELETED: req.body.deleted
    // };

    // TODO find solution to fix res.json --> now not returning istance
    db.clienti.update(newData, {where: {SC_ID: id}})
        .then(db.clienti.findById(req.params.id))
        .then(cliente => {
            console.log(cliente)
            res.json(cliente);
        }).catch(err => res.send(err.errors));
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
    }).then(cliente => {
        // res.send(`removed cliente id: ${id}`);
        res.json(cliente);
    }).catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;