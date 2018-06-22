var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const matricola = req.body.matricola;
    const ssId = req.body.ssId;
    const dettagli = req.body.dettagli;
    const creationDate = req.body.creationDate;
    const lastUpdate = req.body.lastUpdate;
   
    db.matricole.create({
        SM_MATRICOLA: matricola,
        SM_SS_ID: ssId,
        SM_DETTAGLI: dettagli,
        SM_CREATION_DATE: creationDate,
        SM_LAST_UPDATE: lastUpdate,

    }).then(function() {
      res.send('matricola creata');
    });
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    db.matricole.findAll()
    .then(matricola => {
      res.json(matricola);
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