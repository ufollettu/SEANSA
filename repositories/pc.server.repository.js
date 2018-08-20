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

  updatePcRx(hwId, ip, date) {
    const query = "UPDATE `SA_PC` set `SP_LAST_RX`=" + now() + "',  `SP_IP`='" + ip + "',  `SP_PC_DATE_TIME`='" + date + "'  WHERE `SP_HW_ID` = '" + hwId + "'";
    return db.pc.query(query, { type: Sequelize.QueryTypes.SELECT })
  }
}

var repository = new Repository();

module.exports = repository;
