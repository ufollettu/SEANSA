"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_pc", {
      SP_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SP_HW_ID: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      SP_LAST_RX: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      SP_IP: {
        type: Sequelize.STRING(20),
        defaultValue: null
      },
      SP_STATUS: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: "0"
      },
      SP_PC_DATE_TIME: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_pc");
  }
};
