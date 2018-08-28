const db = require('../models');
const Sequelize = require('sequelize');
var sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, { dialect: 'mysql', operatorsAliases: false });

class Repository {

  findLicense(key) {
    const query = "SELECT `SS_ID`, `SS_KEY`, `SS_OEM`, `SS_EXPIRE`, `SP_HW_ID`, `SS_STATUS`, `SP_PC_DATE_TIME`, (select GROUP_CONCAT(SM_MATRICOLA SEPARATOR '#') from SA_MATRICOLE left join SA_SKS ON SS_ID = SM_SS_ID where `SS_KEY`='" + key + "' AND SS_OEM = 12) as SS_ALLOWED_SERIALS FROM `SA_SKS` left join `SA_PC` on `SS_SP_ID` = `SP_ID` WHERE `SS_STATUS`>=0 and `SS_KEY`='" + key + "'";
    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
  }

  findOem(key, hwId) {
    const query = "SELECT `SS_OEM`, `SS_EXPIRE`, `SS_ID` FROM `SA_SKS` left join `SA_PC` on `SS_SP_ID` = `SP_ID` WHERE `SS_STATUS`>=0 and `SS_KEY`='" + key + "' and `SP_HW_ID`='" + hwId + "'"
    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
  }

  findAllowedSerials(keyId) {
    const query = "SELECT GROUP_CONCAT(SM_MATRICOLA SEPARATOR '#') AS ALLOWEDS from SA_MATRICOLE left join SA_SKS ON SS_ID = SM_SS_ID where SM_SS_ID = '" + keyId + "' AND SS_OEM = 12";
    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
  }

  updateLicense(pcId, customerName, referenteName, referentePhone, license) {
    const query = "UPDATE `SA_SKS` SET `SS_ACTIVATION_DATE`=now(),  `SS_SP_ID`=" + pcId + ",  `SS_ACTIVATED_BY`='" + customerName + "', `SS_ACTIVATION_REFERENT`='" + referenteName + ' - ' + referentePhone + "' WHERE `SS_KEY`='" + license + "'";
    return sequelize.query(query)
  }

  updateMismatchCount(id) {
    const query = "UPDATE `SA_SKS` SET `SS_MISMATCH_COUNT`=(`SS_MISMATCH_COUNT`+1), `SS_STATUS`=0  WHERE `SS_ID` = " + id;
    return sequelize.query(query)
  }

}

var repository = new Repository();

module.exports = repository;
