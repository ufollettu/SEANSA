"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sa_custom_styles", {
      SCZ_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER().UNSIGNED
      },
      SCZ_LOGO_MIMETYPE: {
        type: Sequelize.STRING(50),
        defaultValue: "image/png"
      },
      SCZ_LOGO_NAME: {
        type: Sequelize.STRING(100),
        defaultValue: "raniero.png"
      },
      SCZ_SU_ID: {
        type: Sequelize.INTEGER(),
        unique: true
      },
      SCZ_THEME: {
        type: Sequelize.STRING(50),
        defaultValue: "default-theme"
      },
      SCZ_PRIMARY_COLOR: {
        type: Sequelize.STRING(50),
        defaultValue: "rgb(0,0,255)"
      },
      SCZ_ACCENT_COLOR: {
        type: Sequelize.STRING(50),
        defaultValue: "rgb(255,255,0)"
      },
      SCZ_WARN_COLOR: {
        type: Sequelize.STRING(50),
        defaultValue: "rgb(255,0,0)"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sa_custom_styles");
  }
};
