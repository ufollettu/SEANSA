'use strict';
module.exports = (sequelize, DataTypes) => {
  var Matricole = sequelize.define('Matricole', {
    matricola: DataTypes.INTEGER,
    ss_id: DataTypes.INTEGER,
    dettagli: DataTypes.STRING,
    creation_date: DataTypes.DATE,
    last_update: DataTypes.DATE
  }, {
    paranoid: true,
    underscored: true
  });
  Matricole.associate = function(models) {
    // associations can be defined here
  };
  return Matricole;
};