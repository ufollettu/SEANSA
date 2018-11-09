"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_sks", {
      SS_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SS_KEY: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      SS_OEM: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: "0"
      },
      SS_ACTIVATION_DATE: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      SS_EXPIRE: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      },
      SS_CREATED: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
      },
      SS_LAST_EDIT: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
      },
      SS_MISMATCH_COUNT: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      SS_STATUS: {
        allowNull: false,
        type: Sequelize.TINYINT(2),
        defaultValue: "0"
      },
      SS_SC_ID: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null
      },
      SS_SP_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      SS_SPK_ID: {
        type: Sequelize.INTEGER(10)
      },
      SS_CREATOR_ID: {
        type: Sequelize.INTEGER(10)
      },
      SS_ACTIVATED_BY: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      SS_ACTIVATION_REFERENT: {
        type: Sequelize.TEXT,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_sks");
  }
};
