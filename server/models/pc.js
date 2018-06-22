'use strict';
module.exports = (sequelize, DataTypes) => {
  var PC = sequelize.define('sa_pc', {
    SP_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    SP_HW_ID: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    SP_LAST_RX: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    SP_IP: {
      type: DataTypes.STRING(20),
      defaultValue: null  
    },
    SP_STATUS: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: "0"
    },
    SP_PC_DATE_TIME: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_pc',
  });
  PC.associate = function(models) {
    // associations can be defined here
  };
  return PC;
};