var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const una = req.body.una;
    const paw = req.body.paw;
    const level = req.body.level;
    const lastLogin = req.body.lastLogin;
    const creation = req.body.creation;
    const lastEdit = req.body.lastEdit;
    const deleted = req.body.deleted;
    const lastIp = req.body.lastIp;

    db.utenti.create({
        SU_UNA: una,
        SU_PAW: paw,
        SU_LEVEL: level,
        SU_LAST_LOGIN: lastLogin,
        SU_CREATION: creation,
        SU_LAST_EDIT: lastEdit,
        SU_DELETED: deleted,
        SU_LAST_IP: lastIp
    }).then(function() {
      res.send('utente creato');
    });
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    db.utenti.findAll()
    .then(utenti => {
      res.json(utenti);
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