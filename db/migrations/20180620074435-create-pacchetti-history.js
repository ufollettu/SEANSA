"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_pacchetti_history", {
      SPKH_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SPKH_SPK_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      SPKH_SU_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      SPKH_SS_ID: {
        // allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      SPKH_ACTION: {
        type: Sequelize.STRING(50)
      },
      SPKH_TS: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_pacchetti_history");
  }
};
