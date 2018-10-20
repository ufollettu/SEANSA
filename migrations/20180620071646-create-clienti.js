"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_clienti", {
      SC_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SC_NOME: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      SC_PIVA: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      SC_COD_FISCALE: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      SC_INDIRIZZO: {
        type: Sequelize.STRING(200),
        defaultValue: null
      },
      SC_EMAIL: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      SC_TELEFONO: {
        type: Sequelize.STRING(20),
        defaultValue: null
      },
      SC_REFERENTE_NOME: {
        type: Sequelize.STRING(100),
        defaultValue: null
      },
      SC_TEL_REFERENTE: {
        type: Sequelize.STRING(100),
        defaultValue: null
      },
      SC_CREATOR_ID: {
        type: Sequelize.INTEGER(10)
      },
      SC_TS: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
      },
      SC_DELETED: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: "0"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_clienti");
  }
};
