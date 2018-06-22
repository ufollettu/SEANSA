var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const ssId = req.body.ssId;
    const ts = req.body.ts;
   
    db.rinnovi.create({
        SR_SS_ID: ssId,
        SR_TS: ts
    }).then(function() {
      res.send('rinnovo creato');
    });
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    db.rinnovi.findAll()
    .then(rinnovo => {
      res.json(rinnovo);
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