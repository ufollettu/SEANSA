'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false,
  // disable SQL query log
  logging: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.utenti = require('./utenti')(sequelize, Sequelize);
db.matricole = require('./matricole')(sequelize, Sequelize);
db.rinnovi = require('./rinnovi')(sequelize, Sequelize);
db.pacchetti = require('./pacchetti')(sequelize, Sequelize);
db.pacchettiHistory = require('./pacchetti_history')(sequelize, Sequelize);
db.sks = require('./sks')(sequelize, Sequelize);
db.clienti = require('./clienti')(sequelize, Sequelize);
db.pc = require('./pc')(sequelize, Sequelize);
db.utentiPermessi = require('./utenti-permessi')(sequelize, Sequelize);
db.customStyles = require('./custom-styles')(sequelize, Sequelize);

// Relations

// Hooks

module.exports = db;
