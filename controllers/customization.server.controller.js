const repository = require('../repositories/customization.server.repository');
const stream = require('stream');

// List
const list = async (req, res) => {
    // repository.findAll()
    repository.findAll()
        .then(styles => {
            res.json(styles);
        }).catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
// const add = async (req, res) => {
//     res.send('add new item page');
// };
// module.exports.add = add;


// Create
const create = async (req, res) => {
    const data = req.body
    data.SCZ_TYPE = req.file.mimetype;
    data.SCZ_NAME = req.file.originalname;
    data.SCZ_DATA = req.file.buffer;
    console.log(data);
    repository.create(data).then((style) => {
        // res.json(style);
        res.json({ msg: 'File uploaded successfully! -> filename = ' + req.file.originalname });
    }).catch(err => res.send(err.errors));
    // repository.create(data).then((style) => {
    //     res.json(style);
    // }).catch(err => res.send(err.errors));
};
module.exports.create = create;

// Show
const show = async (req, res) => {
    const id = req.params.id;
    repository.findById(id)
        .then(style => {
            // res.json(style);
            const fileContents = Buffer.from(style.SCZ_DATA, "base64");
            const readStream = new stream.PassThrough();
            readStream.end(fileContents);

            res.set('Content-disposition', 'attachment; filename=' + style.SCZ_NAME);
            res.set('Content-Type', style.SCZ_TYPE);

            readStream.pipe(res);
        }).catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
// const edit = async (req, res) => {
//     const id = req.params.id;
//     repository.findById(id)
//         .then(style => {
//             res.send("edit page");
//         }).catch(err => res.send(err.errors));
// };

// module.exports.edit = edit;

// Update
const update = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    repository.findById(id)
        .then(style => {
            return style.update(newData).then((self) => {
                res.json(self);
            });
        }).catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
// const destroy = async (req, res) => {
//     const id = req.params.id;
//     repository.destroy(id)
//         .then(style => {
//             res.json(style);
//         }).catch(err => res.send(err.errors));
// };

// module.exports.destroy = destroy;

// module.exports.setDelete = setDelete;