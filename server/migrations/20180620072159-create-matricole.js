'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matricoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricola: {
        type: Sequelize.INTEGER
      },
      ss_id: {
        type: Sequelize.INTEGER
      },
      dettagli: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.DATE
      },
      last_update: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Matricoles');
  }
};