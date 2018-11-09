'use strict';
module.exports = (sequelize, DataTypes) => {
  var UtentiPermessi = sequelize.define('sa_permessi_utenti', {
    UP_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    UP_U_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    UP_P_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_permessi_utenti',
  });
  UtentiPermessi.associate = function (models) {
    // associations can be defined here
  };
  return UtentiPermessi;
};
