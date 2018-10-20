"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_utenti", {
      SU_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      SU_UNA: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      SU_PAW: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      SU_LAST_LOGIN: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      SU_CREATION: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      SU_LAST_EDIT: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      SU_CREATOR_ID: {
        type: Sequelize.INTEGER(11)
      },
      SU_DELETED: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: "0"
      },
      SU_LAST_IP: {
        type: Sequelize.STRING(20),
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_utenti");
  }
};
