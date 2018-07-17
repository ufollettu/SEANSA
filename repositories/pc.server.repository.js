const db = require("../models");

class Repository {
  findAll() {
    return db.pc.findAll();
  }

  create(data) {
    return db.pc.create(data);
  }

  findById(id) {
    return db.pc.findById(id);
  }

  destroy(id) {
    return db.pc.destroy({
      where: {
        SP_ID: id
      }
    })
  }
}

var repository = new Repository();

module.exports = repository;
