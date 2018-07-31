// SELECT * FROM `amt_premessi_utenti` WHERE `UP_U_ID` = 1 AND `UP_P_ID` = 2

const db = require("../models");

class Repository {
  findAll() {
    return db.utentiPermessi.findAll({
      attributes: [['UP_U_ID', 'userId'], ['UP_P_ID', 'permissionId']]
    });
  }

  create(data) {
    return db.utentiPermessi.create(data);
  }

  findOne(userId, permissionId) {
    return db.utentiPermessi.findOne({ where: { UP_U_ID: userId, UP_P_ID: permissionId } });
  }

  destroy(key) {
    return db.utentiPermessi.destroy({ where: key })
  }

}

var repository = new Repository();

module.exports = repository;
