const db = require("../models");
const moment = require("moment");

// const Sequelize = require('sequelize');
// var sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, { dialect: 'mysql', operatorsAliases: false });

class Repository {
  findAll() {
    return db.pc.findAll();
  }
  findAllBySksCreatorId(sksCreatorId) {
    const query =
      "SELECT `SP_ID`,`SP_HW_ID`,`SP_LAST_RX`,`SP_IP`,`SP_STATUS`,`SP_PC_DATE_TIME` FROM `sa_pc` left join `sa_sks` on `SP_ID` = `SS_SP_ID` where `SS_CREATOR_ID` = '" +
      sksCreatorId +
      "'";
    return db.sequelize.query(query, { type: db.Sequelize.QueryTypes.SELECT });
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
    });
  }

  destroy(id) {
    return db.pc.destroy({
      where: {
        SP_ID: id
      }
    });
  }

  updatePcRx(hwId, ip, date) {
    // const myDate = new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
    const myDate = moment().format("YYYY-MM-DD hh:mm:ss");
    const query =
      "UPDATE `sa_pc` set `SP_LAST_RX`='" +
      myDate +
      "',  `SP_IP`='" +
      ip +
      "',  `SP_PC_DATE_TIME`='" +
      date +
      "'  WHERE `SP_HW_ID` = '" +
      hwId +
      "'";
    return db.sequelize.query(query);
  }
}

var repository = new Repository();

module.exports = repository;
