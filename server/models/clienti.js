'use strict';
module.exports = (sequelize, DataTypes) => {
  var Clienti = sequelize.define('Clienti', {
    nome: DataTypes.STRING,
    piva: DataTypes.STRING,
    cod_fiscale: DataTypes.STRING,
    indirizzo: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    referente_nome: DataTypes.STRING,
    tel_referente: DataTypes.STRING,
    ts: DataTypes.DATE,
    deleted: DataTypes.TINYINT
  }, {
    paranoid: true,
    underscored: true
  });
  Clienti.associate = function(models) {
    // associations can be defined here
  };
  return Clienti;
};