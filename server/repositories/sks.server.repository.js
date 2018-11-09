const db = require("../models");
const Op = db.Sequelize.Op;

class Repository {
  findAll() {
    return db.sks.findAll({
      where: {
        [Op.or]: [{ SS_STATUS: 0 }, { SS_STATUS: 1 }]
      }
    });
  }
  findAllByCreatorId(creatorId) {
    return db.sks.findAll({
      where: {
        SS_CREATOR_ID: creatorId,
        [Op.or]: [{ SS_STATUS: 0 }, { SS_STATUS: 1 }]
      }
    });
  }

  create(data) {
    return db.sks.create(data);
  }

  findById(id) {
    return db.sks.findById(id);
  }

  findOne(data) {
    return db.sks.findOne(data);
  }

  destroy(id) {
    return db.sks.destroy({
      where: {
        SS_ID: id
      }
    });
  }
}

var repository = new Repository();

module.exports = repository;
