'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rinnovi = sequelize.define('Rinnovi', {
    ss_id: DataTypes.INTEGER,
    ts: DataTypes.DATE
  }, {});
  Rinnovi.associate = function(models) {
    // associations can be defined here
  };
  return Rinnovi;
};