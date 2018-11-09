const db = require("../models");
// const Sequelize = require('sequelize');
// var sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {dialect: 'mysql', operatorsAliases: false});

class Repository {
  findAll() {
    const query =
      "SELECT `SS_ID` as 'KeyId', `SS_KEY` as 'Chiave', `SR_CREATOR_ID` AS 'CreatorId', `SR_TS` AS 'Timestamp' from `sa_rinnovi` inner join `sa_sks` on `SR_SS_ID` = `SS_ID` order by `SR_TS` ASC";
    return db.sequelize.query(query, { type: db.Sequelize.QueryTypes.SELECT });
    // return db.rinnovi.findAll();
  }
  findAllByCreatorId(creatorId) {
    const query =
      "SELECT `SS_ID` as 'KeyId', `SS_KEY` as 'Chiave', `SR_CREATOR_ID` AS 'CreatorId', `SR_TS` AS 'Timestamp' from `sa_rinnovi` inner join `sa_sks` on `SR_SS_ID` = `SS_ID` WHERE `SR_CREATOR_ID` = " +
      creatorId +
      " order by `SR_TS` ASC";
    return db.sequelize.query(query, { type: db.Sequelize.QueryTypes.SELECT });
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
    });
  }
}

var repository = new Repository();

module.exports = repository;
