"use strict";
module.exports = (sequelize, DataTypes) => {
  var Matricole = sequelize.define(
    "sa_matricole",
    {
      sm_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      SM_MATRICOLA: {
        allowNull: false,
        type: DataTypes.INTEGER(11)
      },
      SM_SS_ID: {
        allowNull: false,
        type: DataTypes.INTEGER(11)
      },
      SM_DETTAGLI: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      SM_CREATION_DATE: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
      },
      SM_LAST_UPDATE: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "sa_matricole"
    }
  );
  Matricole.associate = function(models) {
    // associations can be defined here
  };
  return Matricole;
};
