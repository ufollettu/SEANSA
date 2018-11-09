const db = require("../models");

class Repository {
  findAll() {
    return db.utenti.findAll();
  }

  findNotDeleted() {
    return db.utenti.findAll({
      where: {
        SU_DELETED: 0
      }
    });
  }

  findNotDeletedByCreatorId(creatorId) {
    return db.utenti.findAll({
      where: {
        SU_DELETED: 0,
        SU_CREATOR_ID: creatorId
      }
    });
  }
  create(data) {
    return db.utenti.create(data);
  }

  findById(id) {
    return db.utenti.findById(id);
  }

  findOne(username) {
    return db.utenti.findOne({ where: { SU_UNA: username } });
  }

  destroy(id) {
    return db.utenti.destroy({
      where: {
        SU_ID: id
      }
    });
  }
}

var repository = new Repository();

module.exports = repository;
