"use strict";
module.exports = (sequelize, DataTypes) => {
  var Sks = sequelize.define(
    "sa_sks",
    {
      SS_ID: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
        type: DataTypes.DATE
      },
      SS_EXPIRE: {
        type: DataTypes.DATEONLY
      },
      SS_CREATED: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW()
      },
      SS_LAST_EDIT: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
      },
      SS_MISMATCH_COUNT: {
        type: DataTypes.INTEGER(11),
        defaultValue: "0"
      },
      SS_STATUS: {
        type: DataTypes.TINYINT(2),
        allowNull: true,
        defaultValue: "1"
      },
      SS_SC_ID: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED
      },
      SS_SP_ID: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
        defaultValue: "0"
      },
      SS_SPK_ID: {
        type: DataTypes.INTEGER(10)
      },
      SS_CREATOR_ID: {
        type: DataTypes.INTEGER(10)
      },
      SS_ACTIVATED_BY: {
        type: DataTypes.STRING(50)
      },
      SS_ACTIVATION_REFERENT: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "sa_sks"
    }
  );
  Sks.associate = function(models) {
    // associations can be defined here
  };
  return Sks;
};
