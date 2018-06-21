var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const key = req.body.key;
    const oem = req.body.oem;
    const activationDate = req.body.activationDate;
    const expire = req.body.expire;
    const created = req.body.created;
    const lastEdit = req.body.lastEdit;
    const mismatchCount = req.body.mismatchCount;
    const status = req.body.status;
    const scId = req.body.scId;
    const spId = req.body.spId;
    const activatedBy = req.body.activatedBy;
    const activationReferent = req.body.activationReferent;
   
    db.sks.create({
        SS_KEY: key,
        SS_OEM: oem,
        SS_ACTIVATION_DATE: activationDate,
        SS_EXPIRE: expire,
        SS_CREATED: created,
        SS_LAST_EDIT: lastEdit,
        SS_MISMATCH_COUNT: mismatchCount,
        SS_STATUS: status,
        SS_SC_ID: scId,
        SS_SP_ID: spId,
        SS_ACTIVATED_BY: activatedBy,
        SS_ACTIVATION_REFERENT:activationReferent
    }).then(function() {
      res.send('utente creato');
    });
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    db.sks.findAll()
    .then(sks => {
      res.json(sks);
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