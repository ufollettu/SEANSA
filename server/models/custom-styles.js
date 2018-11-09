"use strict";
module.exports = (sequelize, DataTypes) => {
  var CustomStyles = sequelize.define(
    "sa_custom_styles",
    {
      SCZ_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER().UNSIGNED
      },
      SCZ_LOGO_MIMETYPE: {
        type: DataTypes.STRING(50),
        defaultValue: "image/png"
      },
      SCZ_LOGO_NAME: {
        type: DataTypes.STRING(100),
        defaultValue: "raniero.png"
      },
      SCZ_SU_ID: {
        type: DataTypes.INTEGER(),
        unique: true
      },
      SCZ_THEME: {
        type: DataTypes.STRING(50),
        defaultValue: "default-theme"
      },
      SCZ_PRIMARY_COLOR: {
        type: DataTypes.STRING(50),
        defaultValue: "rgb(0,0,255)"
      },
      SCZ_ACCENT_COLOR: {
        type: DataTypes.STRING(50),
        defaultValue: "rgb(255,255,0)"
      },
      SCZ_WARN_COLOR: {
        type: DataTypes.STRING(50),
        defaultValue: "rgb(255,0,0)"
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "sa_custom_styles"
    }
  );
  CustomStyles.associate = function(models) {
    // associations can be defined here
  };
  return CustomStyles;
};
