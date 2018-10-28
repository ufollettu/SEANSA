const repository = require("../repositories/sks.server.repository");
const randomPassword = require("../helpers/pwd-generator");
const moment = require("moment");
const nodemailer = require("nodemailer");

// List
const list = async (req, res) => {
  const allRes = req.isAdmin
    ? repository.findAll()
    : repository.findAllByCreatorId(req.userId);

  allRes
    .then(sks => {
      res.json(sks);
    })
    .catch(err => res.send(err.errors));
};
module.exports.list = list;

// New
// const add = async (req, res) => {
//     res.send('add new item page');
// };
// module.exports.add = add;

// Create
const create = async (req, res) => {
  const data = {
    SS_KEY: randomPassword(25),
    SS_OEM: req.body.SS_OEM,
    SS_CREATED: moment().format("YYYY-MM-DD hh:mm:ss"),
    SS_EXPIRE: req.body.SS_EXPIRE,
    SS_SC_ID: req.body.SS_SC_ID,
    SS_SPK_ID: req.body.SS_SPK_ID,
    SS_CREATOR_ID: req.userId,
    SS_ACTIVATED_BY: "",
    SS_ACTIVATION_REFERENT: ""
  };

  repository
    .create(data)
    .then(sks => {
      res.json(sks);
    })
    .catch(err => res.send(err.errors));
};
module.exports.create = create;

const email = async (req, res) => {
  const data = {
    SS_KEY: req.body.sks
  };

  repository.findOne(data).then(sks => {
    if (!sks) {
      return res.status(422).json({
        message: "sks does not exists"
      });
    }

    // Change in production
    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PWD
      }
    });

    const message = req.body.message
      ? req.body.message
      : "this is your new sks license: " + req.body.sks;

    var mailOptions = {
      from: "pasquale.merolle@gmail.com",
      to: req.body.email,
      subject: "new sks licence " + req.body.sks,
      html: "<p>" + message + "</p>"
    };

    // send mail with defined transport object
    transport.sendMail(mailOptions, function(error, response) {
      if (error) {
        res.json(error);
      } else {
        res.json(response.accepted);
      }
      // if you don't want to use this transport object anymore, uncomment following line
      transport.close(); // shut down the connection pool, no more messages
    });
  });
};

module.exports.email = email;

// Show
const show = async (req, res) => {
  const id = req.params.id;
  repository
    .findById(id)
    .then(sks => {
      res.json(sks);
    })
    .catch(err => res.send(err.errors));
};
module.exports.show = show;

// Edit
// const edit = async (req, res) => {
//     const id = req.params.id;
//     repository.findById(id)
//         .then(sks => {
//             res.send("edit page");
//         }).catch(err => res.send(err.errors));
// };

// module.exports.edit = edit;

// Update
const update = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  repository
    .findById(id)
    .then(sks => {
      return sks.update(newData).then(self => {
        res.json(self);
      });
    })
    .catch(err => res.send(err.errors));
};
module.exports.update = update;

// Destroy
const destroy = async (req, res) => {
  const id = req.params.id;
  repository
    .destroy(id)
    .then(sks => {
      res.json(sks);
    })
    .catch(err => res.send(err.errors));
};
module.exports.destroy = destroy;
