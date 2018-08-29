const db = require("../models");

// const Sequelize = require('sequelize');
// var sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, { dialect: 'mysql', operatorsAliases: false });

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

  updatePcRx(hwId, ip, date) {
    const myDate = new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
    const query = "UPDATE `SA_PC` set `SP_LAST_RX`='" + myDate + "',  `SP_IP`='" + ip + "',  `SP_PC_DATE_TIME`='" + date + "'  WHERE `SP_HW_ID` = '" + hwId + "'";
    return db.sequelize.query(query)
  }
}

var repository = new Repository();

module.exports = repository;
