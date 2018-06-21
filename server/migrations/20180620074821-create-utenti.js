'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sa_utenti', {
      SU_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SU_UNA: {
        type: Sequelize.STRING
      },
      SU_PAW: {
        type: Sequelize.STRING
      },
      SU_LEVEL: {
        type: Sequelize.INTEGER
      },
      SU_LAST_LOGIN: {
        type: Sequelize.DATE
      },
      SU_CREATION: {
        type: Sequelize.DATE
      },
      SU_LAST_EDIT: {
        type: Sequelize.DATE
      },
      SU_DELETED: {
        type: Sequelize.TINYINT
      },
      SU_LAST_IP: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('sa_utenti');
  }
};