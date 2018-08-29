const db = require("../models");

class Repository {
  findAll() {
    return db.utentiPermessi.findAll();
  }

  create(data) {
    return db.utentiPermessi.create(data);
  }

  findById(id) {
    return db.utentiPermessi.findById(id)
  }

  findByUsername(userId) {
    return db.utentiPermessi.findAll({ where: { UP_U_ID: userId } });
  }

  findOne(userId, permissionId) {
    return db.utentiPermessi.findOne({ where: { UP_U_ID: userId, UP_P_ID: permissionId } });
  }

  destroy(id) {
    return db.utentiPermessi.destroy({
      where: {
        UP_ID: id
      }
    })
  }

  bulkDestroy(userId) {
    return db.utentiPermessi.destroy({
      where: {
        UP_U_ID: userId
      }
    })
  }

  bulkCreate(data) {
    return db.utentiPermessi.bulkCreate(data)
  }

}

var repository = new Repository();

module.exports = repository;
