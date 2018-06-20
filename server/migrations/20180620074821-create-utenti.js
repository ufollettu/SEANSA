'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('utentis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      una: {
        type: Sequelize.STRING
      },
      paw: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      last_login: {
        type: Sequelize.DATE
      },
      creation: {
        type: Sequelize.DATE
      },
      last_edit: {
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.TINYINT
      },
      last_ip: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('utentis');
  }
};