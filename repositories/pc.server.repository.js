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

  findOne(hwId) {
    return db.pc.findOne({
      where: {
        SP_STATUS: 0,
        SP_HW_ID: hwId
      }
    })
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
