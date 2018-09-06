'use strict';
module.exports = (sequelize, DataTypes) => {
  var CustomStyles = sequelize.define('sa_custom_styles', {
    SCZ_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    SCZ_TYPE: {
      type: DataTypes.STRING(50)
    },
    SCZ_NAME: {
      type: DataTypes.STRING(50)
    },
    SCZ_DATA: {
      type: DataTypes.BLOB('long')
    },
    SCZ_SU_ID: {
      type: DataTypes.INTEGER(10)
    },
    SCZ_THEME: {
      type: DataTypes.STRING(50)
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