'use strict';
module.exports = (sequelize, DataTypes) => {
  var utenti = sequelize.define('utenti', {
    una: DataTypes.STRING,
    paw: DataTypes.STRING,
    level: DataTypes.INTEGER,
    last_login: DataTypes.DATE,
    creation: DataTypes.DATE,
    last_edit: DataTypes.DATE,
    deleted: DataTypes.TINYINT,
    last_ip: DataTypes.STRING
  }, {});
  utenti.associate = function(models) {
    // associations can be defined here
  };
  return utenti;
};