const db = require("../models");

class Repository {
  findAll() {
    return db.rinnovi.findAll();
  }

  create(data) {
    return db.rinnovi.create(data);
  }

  findById(id) {
    return db.rinnovi.findById(id);
  }

  destroy(id) {
    return db.rinnovi.destroy({
      where: {
          SR_ID: id
      }
  })
  }
}

var repository = new Repository();

module.exports = repository;
