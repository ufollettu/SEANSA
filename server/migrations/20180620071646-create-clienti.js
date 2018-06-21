'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clientis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      piva: {
        type: Sequelize.STRING
      },
      cod_fiscale: {
        type: Sequelize.STRING
      },
      indirizzo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      referente_nome: {
        type: Sequelize.STRING
      },
      tel_referente: {
        type: Sequelize.STRING
      },
      ts: {
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.TINYINT
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
    return queryInterface.dropTable('Clientis');
  }
};