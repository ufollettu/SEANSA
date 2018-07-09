var db = require('../models');

// List
const list = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.pc.findAll()
        .then(pcs => {
            res.json(pcs);
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
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    db.pc.findById(id)
        .then(pc => {
            res.json(pc);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
const edit = async (req, res) => {
    const id = req.params.id;
    db.pc.findById(id)
        .then(pc => {
            res.send("edit page");
            // res.render("/edit", {pc: pc});
        }).catch(err => res.send(err.errors));
};

module.exports.edit = edit;

// Update
const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const newData = {
        SP_HW_ID: req.body.hwId,
        SP_LAST_RX: req.body.lastRx,
        SP_IP: req.body.ip,
        SP_STATUS: req.body.status,
        SP_PC_DATE_TIME: req.body.pcDateTime,
    };

    db.pc.update(newData, {
            returning: true,
            where: {
                SP_ID: id
            }
        })
        .then((pc) => {
            res.send(`updated pc id: ${id}. New hw id is: ${newData}`);
        })
        .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
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
};
module.exports.destroy = destroy;


// const getByHwId = async (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     const hwId = req.params.id;

//     db.pc.findAll({
//             where: {
//                 SP_HW_ID: hwId
//             }
//         })
//         .then(pc => {
//             res.json(pc);
//         }).catch(err => res.send(err.errors));
//     // return ReS(res, {message:'lista utenti'}, 304);
// };
// module.exports.getByHwId = getByHwId;


// const updateHwId = async (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     const hwId = req.params.hwId;
//     const newData = {
//         SP_LAST_RX: Date.now(),
//         SP_IP: req.body.ip,
//         SP_PC_DATE_TIME: req.body.pcDateTime,
//     };

//     db.pc.update(newData, {
//             returning: true,
//             where: {
//                 SP_HW_ID: hwId
//             }
//         })
//         .then((pc) => {
//             res.send(`updated pc Hw id: ${hwId}. New data is: ${newData}`);
//             // res.json(pc);
//         })
//         .catch(err => res.send(err.errors));
//     // return ReS(res, {message:'lista utenti'}, 304);
// };
// module.exports.updateHwId = updateHwId;

// const updateStatus = async (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     const id = req.params.id;
//     const newData = {
//         SP_STATUS: req.body.status
//     };

//     db.pc.update(newData, {
//             returning: true,
//             where: {
//                 SP_ID: id
//             }
//         })
//         .then((pc) => {
//             res.send(`updated pc id: ${id}. New status is: ${newData.SP_STATUS}`);
//             // res.json(pc);
//         })
//         .catch(err => res.send(err.errors));
//     // return ReS(res, {message:'lista utenti'}, 304);
// };
// module.exports.updateStatus = updateStatus;