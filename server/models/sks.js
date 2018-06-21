'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sks = sequelize.define('sa_sks', {
    SS_ID: { type: DataTypes.INTEGER, primaryKey: true},
    SS_KEY: DataTypes.STRING,
    SS_OEM: DataTypes.TINYINT,
    SS_ACTIVATION_DATE: DataTypes.DATE,
    SS_EXPIRE: DataTypes.DATE,
    SS_CREATED: DataTypes.DATE,
    SS_LAST_EDIT: DataTypes.DATE,
    SS_MISMATCH_COUNT: DataTypes.INTEGER,
    SS_STATUS: DataTypes.TINYINT,
    SS_SC_ID: DataTypes.INTEGER,
    SS_SP_ID: DataTypes.INTEGER,
    SS_ACTIVATED_BY: DataTypes.STRING,
    SS_ACTIVATION_REFERENT: DataTypes.TEXT
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_sks',
  });
  Sks.associate = function(models) {
    // associations can be defined here
  };
  return Sks;
};