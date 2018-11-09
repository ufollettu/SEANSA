"use strict";
module.exports = (sequelize, DataTypes) => {
  var PacchettiHistory = sequelize.define(
    "sa_pacchetti_history",
    {
      SPKH_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED
      },
      SPKH_SPK_ID: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
      },
      SPKH_SU_ID: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
      },
      SPKH_SS_ID: {
        // allowNull: false,
        type: DataTypes.INTEGER(10)
      },
      SPKH_ACTION: {
        type: DataTypes.STRING(50)
      },
      SPKH_TS: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "sa_pacchetti_history"
    }
  );
  PacchettiHistory.associate = function(models) {
    // associations can be defined here
  };
  return PacchettiHistory;
};
