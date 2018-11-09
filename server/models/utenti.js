"use strict";
module.exports = (sequelize, DataTypes) => {
  var Utenti = sequelize.define(
    "sa_utenti",
    {
      SU_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      SU_UNA: {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      SU_PAW: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      SU_LAST_LOGIN: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      SU_CREATION: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      SU_LAST_EDIT: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      SU_CREATOR_ID: {
        type: DataTypes.INTEGER(11)
      },
      SU_DELETED: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: "0"
      },
      SU_LAST_IP: {
        type: DataTypes.STRING(20),
        defaultValue: null
      }
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
      // define the table's name
      tableName: "sa_utenti"
      // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
      // to the model and throw an OptimisticLockingError error when stale instances are saved.
      // Set to true or a string with the attribute name you want to use to enable.
      // version: true
    }
  );
  Utenti.associate = function(models) {
    // associations can be defined here
  };
  return Utenti;
};
