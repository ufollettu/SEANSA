var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const nome = req.body.nome;
    const pIva = req.body.pIva;
    const codFiscale = req.body.codFiscale;
    const indirizzo = req.body.indirizzo;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const referenteNome = req.body.referenteNome;
    const telReferente = req.body.telReferente;
    const ts = req.body.ts;
    const deleted = req.body.deleted;
   
    db.clienti.create({
        SC_NOME: nome,
        SC_PIVA: pIva,
        SC_COD_FISCALE: codFiscale,
        SC_INDIRIZZO: indirizzo,
        SC_EMAIL: email,
        SC_TELEFONO: telefono,
        SC_REFERENTE_NOME: referenteNome,
        SC_TEL_REFERENTE: telReferente,
        SC_TS: ts,
        SC_DELETED: deleted

    }).then(function() {
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

// const update = async (req, res) => {   
//     return ReS(res, {message:'update utenti'}, 204);
// };
// module.exports.update = update;

// const remove = async (req, res) => {
//     return ReS(res, {message:'Deleted utenti'}, 204);
// };
// module.exports.remove = remove;


// const login = async function(req, res){

//     return ReS(res, {message:'login utenti'}, 204);
// };
// module.exports.login = login;