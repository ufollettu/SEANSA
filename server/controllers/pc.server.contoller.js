var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = {
        SP_HW_ID: req.body.hwId,
        SP_LAST_RX: req.body.lastRx,
        SP_IP: req.body.ip,
        SP_STATUS: req.body.status,
        SP_PC_DATE_TIME: req.body.pcDateTime,
    };

    db.pc.create(data).then(function () {
        res.send('pc creato');
    }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'utente creato'}, 204);
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    db.pc.findAll()
        .then(pcs => {
            res.json(pcs);
        }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.get = get;

const getById = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.pc.findById(id)
        .then(pc => {
            res.json(pc);
        }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.getById = getById;

const getByHwId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const hwId = req.params.id;

    db.pc.findAll({
            where: {
                SP_HW_ID: hwId
            }
        })
        .then(pc => {
            res.json(pc);
        }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.getByHwId = getByHwId;

const remove = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;

    db.pc.destroy({
            where: {
                SP_ID: id
            }
        })
        .then(pc => {
            res.send(`removed pc id: ${id}`);
        }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.remove = remove;

const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SP_HW_ID : req.body.hwId
    };

    db.pc.update(newData, {
            returning: true,
            where: {
                SP_ID: id
            }
        })
        .then((pc) => {
            res.send(`updated pc id: ${id}. New hw id is: ${newData.SP_HW_ID}`);
            // res.json(pc);
        })
        .catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.update = update;

const updateHwId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const hwId = req.params.hwId;
    const newData = {
        SP_LAST_RX: Date.now(),
        SP_IP: req.body.ip,
        SP_PC_DATE_TIME: req.body.pcDateTime,
    };

    db.pc.update(newData, {
            returning: true,
            where: {
                SP_HW_ID: hwId
            }
        })
        .then((pc) => {
            res.send(`updated pc Hw id: ${hwId}. New data is: ${newData}`);
            // res.json(pc);
        })
        .catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.updateHwId = updateHwId;

const updateStatus = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SP_STATUS: req.body.status
    };

    db.pc.update(newData, {
            returning: true,
            where: {
                SP_ID: id
            }
        })
        .then((pc) => {
            res.send(`updated pc id: ${id}. New status is: ${newData.SP_STATUS}`);
            // res.json(pc);
        })
        .catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.updateStatus = updateStatus;

// fix...
const getByStatusAndHwId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // const hwId = req.params.hwId;

    db.pc.findAll({attributes: ['SP_ID']})
        .then(pc => {
            res.json(pc);
        }).catch(err => res.send(err.errors));
    // return ReS(res, {message:'lista utenti'}, 304);
};
module.exports.getByStatusAndHwId = getByStatusAndHwId;