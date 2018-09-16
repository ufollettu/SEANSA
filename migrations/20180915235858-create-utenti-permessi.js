'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sa_permessi_utenti', {
      UP_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      UP_U_ID: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      UP_P_ID: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sa_permessi_utenti');
  }
};
