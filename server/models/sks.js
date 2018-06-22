'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sks = sequelize.define('sa_sks', {
    SS_ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    SS_KEY: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    SS_OEM: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: "0"
    },
    SS_ACTIVATION_DATE: {
      type: DataTypes.NOW,
      defaultValue: null
    },
    SS_EXPIRE: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    SS_CREATED: {
      type: DataTypes.NOW,
      allowNull: true,
      defaultValue: "0000-00-00 00:00:00"
    },
    SS_LAST_EDIT: {
      type: DataTypes.NOW,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
    SS_MISMATCH_COUNT: {
      type: DataTypes.INTEGER(11),
      defaultValue: "0"
    },
    SS_STATUS: {
      type: DataTypes.TINYINT(2),
      allowNull: true,
      defaultValue: "0"
    },
    SS_SC_ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      defaultValue: null
    },
    SS_SP_ID: {
      allowNull: false,
      type: DataTypes.INTEGER(11),
    },
    SS_ACTIVATED_BY: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SS_ACTIVATION_REFERENT: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_sks',
  });
  Sks.associate = function (models) {
    // associations can be defined here
  };
  return Sks;
};