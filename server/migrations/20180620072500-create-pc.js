'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PCs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hw_id: {
        type: Sequelize.STRING
      },
      last_rx: {
        type: Sequelize.DATE
      },
      ip: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      pc_date_time: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('PCs');
  }
};