const db = require("../models");

class Repository {
  findAll() {
    return db.utenti.findAll();
  }

  create(data) {
    return db.utenti.create(data);
  }

  findById(id) {
    return db.utenti.findById(id);
  }

  // findOne(data) {
  //     return db.utenti.findOne(data);
  // }

  findOne(username) {
    return db.utenti.findOne({ where: { SU_UNA: username } });
  }

  destroy(data) {
    return db.utenti.destroy(data);
  }
}

var repository = new Repository();

module.exports = repository;
