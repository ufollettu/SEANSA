var db = require('../models');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const hwId = req.body.hwId;
    const lastRx = req.body.lastRx;
    const ip = req.body.ip;
    const status = req.body.status;
    const pcDateTime = req.body.pcDateTime;

    db.pc.create({
        SP_HW_ID: hwId,
        SP_LAST_RX: lastRx,
        SP_IP: ip,
        SP_STATUS: status,
        SP_PC_DATE_TIME: pcDateTime,

    }).then(function () {
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
            // returning: true,
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


//   Post.update({
//     updatedAt: null,
//   }, {
//     where: {
//       deletedAt: {
//         [Op.ne]: null
//       }
//     }
//   });
// UPDATE post SET updatedAt = null WHERE deletedAt NOT NULL;