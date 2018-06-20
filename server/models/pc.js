'use strict';
module.exports = (sequelize, DataTypes) => {
  var PC = sequelize.define('PC', {
    hw_id: DataTypes.STRING,
    last_rx: DataTypes.DATE,
    ip: DataTypes.STRING,
    status: DataTypes.TINYINT,
    pc_date_time: DataTypes.DATE
  }, {});
  PC.associate = function(models) {
    // associations can be defined here
  };
  return PC;
};