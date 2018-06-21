'use strict';
module.exports = (sequelize, DataTypes) => {
  var Utenti = sequelize.define('sa_utenti', {
    SU_ID: { type: DataTypes.INTEGER, primaryKey: true},
    SU_UNA: DataTypes.STRING,
    SU_PAW: DataTypes.STRING,
    SU_LEVEL: DataTypes.INTEGER,
    SU_LAST_LOGIN: DataTypes.DATE,
    SU_CREATION: DataTypes.DATE,
    SU_LAST_EDIT: DataTypes.DATE,
    SU_DELETED: DataTypes.TINYINT,
    SU_LAST_IP: DataTypes.STRING
  }, {
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
    tableName: 'sa_utenti',
    // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
    // to the model and throw an OptimisticLockingError error when stale instances are saved.
    // Set to true or a string with the attribute name you want to use to enable.
    // version: true
  });
  Utenti.associate = function (models) {
    // associations can be defined here
  };
  return Utenti;
};