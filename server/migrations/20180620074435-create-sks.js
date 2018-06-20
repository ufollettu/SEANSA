'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING
      },
      oem: {
        type: Sequelize.TINYINT
      },
      activation_date: {
        type: Sequelize.DATE
      },
      expire: {
        type: Sequelize.DATE
      },
      created: {
        type: Sequelize.DATE
      },
      last_edit: {
        type: Sequelize.DATE
      },
      mismatch_count: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT
      },
      sc_id: {
        type: Sequelize.INTEGER
      },
      sp_id: {
        type: Sequelize.INTEGER
      },
      activated_by: {
        type: Sequelize.STRING
      },
      activation_referent: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sks');
  }
};