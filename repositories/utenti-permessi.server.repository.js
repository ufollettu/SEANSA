// SELECT * FROM `amt_premessi_utenti` WHERE `UP_U_ID` = 1 AND `UP_P_ID` = 2

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

  findByUsername(username) {
    return db.utentiPermessi.findAll({ where: { UP_U_ID: username } });
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

}

var repository = new Repository();

module.exports = repository;
