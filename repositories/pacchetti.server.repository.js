const db = require("../models");

class Repository {
  findAll() {
    return db.pacchetti.findAll();
  }

  create(data) {
    return db.pacchetti.create(data);
  }

  findById(id) {
    return db.pacchetti.findById(id);
  }

  findByOwnerId(ownerId) {
    return db.pacchetti.findAll({
      where: { SPK_SU_OWNER_ID: ownerId }
    });
  }

  findByCreatorId(creatorId) {
    return db.pacchetti.findAll({
      where: { SPK_SU_CREATOR_ID: creatorId }
    });
  }

  findOne(data) {
    return db.pacchetti.findOne(data);
  }

  destroy(id) {
    return db.pacchetti.destroy({
      where: {
        SPK_ID: id
      }
    });
  }
}

var repository = new Repository();

module.exports = repository;
