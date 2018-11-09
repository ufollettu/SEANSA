"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_rinnovi", {
      SR_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SR_SS_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      SR_CREATOR_ID: {
        type: Sequelize.INTEGER(10)
      },
      SR_TS: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_rinnovi");
  }
};
