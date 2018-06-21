'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sa_sks', {
      SS_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SS_KEY: {
        type: Sequelize.STRING
      },
      SS_OEM: {
        type: Sequelize.TINYINT
      },
      SS_ACTIVATION_DATE: {
        type: Sequelize.DATE
      },
      SS_EXPIRE: {
        type: Sequelize.DATE
      },
      SS_CREATED: {
        type: Sequelize.DATE
      },
      SS_LAST_EDIT: {
        type: Sequelize.DATE
      },
      SS_MISMATCH_COUNT: {
        type: Sequelize.INTEGER
      },
      SS_STATUS: {
        type: Sequelize.TINYINT
      },
      SS_SC_ID: {
        type: Sequelize.INTEGER
      },
      SS_SP_ID: {
        type: Sequelize.INTEGER
      },
      SS_ACTIVATED_BY: {
        type: Sequelize.STRING
      },
      SS_ACTIVATION_REFERENT: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sa_sks');
  }
};