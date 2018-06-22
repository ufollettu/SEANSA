var db = require('../models');

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
        res.send('cliente creato');
    });
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    db.clienti.findAll()
        .then(cliente => {
            res.json(cliente);
        });
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.get = get;

const updateAllFields = async (req, res) => {
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
            res.send(`updated cliente id: ${id}. New values is: ${newData}`);
            // res.json(clienti);
        })
        .catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.updateAllFields = updateAllFields;

const updateDeleted = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SC_DELETED: 1
    };

    db.clienti.update(newData, {
            returning: true,
            where: {
                SC_ID: id
            }
        })
        .then((clienti) => {
            res.send(`updated cliente id: ${id}. New deleted value is: ${newData.SC_DELETED}`);
            // res.json(pc);
        })
        .catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.updateDeleted = updateDeleted;