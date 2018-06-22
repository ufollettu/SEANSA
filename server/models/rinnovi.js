'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rinnovi = sequelize.define('sa_rinnovi', {
    SR_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    SR_SS_ID: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    SR_TS: {
      allowNull: false,
      type: DataTypes.NOW,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'sa_rinnovi',
  });
  Rinnovi.associate = function(models) {
    // associations can be defined here
  };
  return Rinnovi;
};