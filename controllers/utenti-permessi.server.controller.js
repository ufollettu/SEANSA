const repository = require('../repositories/utenti-permessi.server.repository');

// List
const list = async (req, res) => {
    repository
      .findAll()
      .then(result => {
        res.json(result);
      })
      .catch(err => res.send(err.errors));
  };
  module.exports.list = list;