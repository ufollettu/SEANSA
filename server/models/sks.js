'use strict';
module.exports = (sequelize, DataTypes) => {
  var sks = sequelize.define('sks', {
    key: DataTypes.STRING,
    oem: DataTypes.TINYINT,
    activation_date: DataTypes.DATE,
    expire: DataTypes.DATE,
    created: DataTypes.DATE,
    last_edit: DataTypes.DATE,
    mismatch_count: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
    sc_id: DataTypes.INTEGER,
    sp_id: DataTypes.INTEGER,
    activated_by: DataTypes.STRING,
    activation_referent: DataTypes.TEXT
  }, {});
  sks.associate = function(models) {
    // associations can be defined here
  };
  return sks;
};