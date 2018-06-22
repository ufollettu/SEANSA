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
    .then(rinnovi => {
      res.json(rinnovi);
    });
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.get = get;