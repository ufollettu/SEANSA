'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sa_pacchetti', {
      SPK_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      SPK_SU_CREATOR_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      SPK_SU_OWNER_ID: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      SPK_CREATED: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW()
      },
      SPK_EXPIRE: {
        type: Sequelize.DATEONLY,
      },
      SPK_SKS_COUNT: {
        type: Sequelize.INTEGER(11),
        defaultValue: "0"
      },
      SPK_USED_SKS_COUNT: {
        type: Sequelize.INTEGER(11),
        defaultValue: "0"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sa_pacchetti');
  }
};
