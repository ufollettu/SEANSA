const db = require('../models');
const Sequelize = require('sequelize');
var sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, { dialect: 'mysql', operatorsAliases: false });

class Repository {

  findLicense(key) {
    const query = "SELECT `SS_ID`, `SS_KEY`, `SS_OEM`, `SS_EXPIRE`, `SP_HW_ID`, `SS_STATUS`, `SP_PC_DATE_TIME` FROM `SA_SKS` left join `SA_PC` on `SS_SP_ID` = `SP_ID` WHERE `SS_STATUS`>=0 and `SS_KEY`='" + key + "'";
    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
  }

  findOem(key, hwId) {
    const query = "SELECT `SS_OEM`, `SS_EXPIRE` FROM `SA_SKS` left join `SA_PC` on `SS_SP_ID` = `SP_ID` WHERE `SS_STATUS`>=0 and `SS_KEY`='" + key + "' and `SP_HW_ID`='" + hwId + "'"
    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
  }
}

var repository = new Repository();

module.exports = repository;
