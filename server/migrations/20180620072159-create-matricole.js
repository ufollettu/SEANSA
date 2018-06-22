'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sa_matricole', {
      sm_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      SM_MATRICOLA: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      SM_SS_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      SM_DETTAGLI: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      SM_CREATION_DATE: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SM_LAST_UPDATE: {
        type: Sequelize.NOW,
        defaultValue: queryInterface.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sa_matricole');
  }
};