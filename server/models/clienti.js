'use strict';
module.exports = (sequelize, DataTypes) => {
  var Clienti = sequelize.define('sa_clienti', {
    SC_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    SC_NOME: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    SC_PIVA: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SC_COD_FISCALE: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SC_INDIRIZZO: {
      type: DataTypes.STRING(200),
      defaultValue: null
    },
    SC_EMAIL: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SC_TELEFONO: {
      type: DataTypes.STRING(20),
      defaultValue: null
    },
    SC_REFERENTE_NOME: {
      type: DataTypes.STRING(100),
      defaultValue: null
    },
    SC_TEL_REFERENTE: {
      type: DataTypes.STRING(100),
      defaultValue: null
    },
    SC_TS: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    SC_DELETED: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: "0"
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_clienti',
  });
  Clienti.associate = function (models) {
    // associations can be defined here
  };
  return Clienti;
};