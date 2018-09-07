'use strict';
module.exports = (sequelize, DataTypes) => {
  var CustomStyles = sequelize.define('sa_custom_styles', {
    SCZ_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER().UNSIGNED
    },
    SCZ_LOGO_PATH: {
      type: DataTypes.STRING(255)
    },
    SCZ_LOGO_MIMETYPE: {
      type: DataTypes.STRING(50)
    },
    SCZ_LOGO_NAME: {
      type: DataTypes.STRING(100)
    },
    SCZ_SU_ID: {
      type: DataTypes.INTEGER()
    },
    SCZ_THEME: {
      type: DataTypes.STRING(50),
      defaultValue: 'default-theme'
    }

  }, {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'sa_custom_styles',
    });
  CustomStyles.associate = function (models) {
    // associations can be defined here
  };
  return CustomStyles;
};