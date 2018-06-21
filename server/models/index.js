'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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
db.sks = require('./sks')(sequelize, Sequelize);
db.clienti = require('./clienti')(sequelize, Sequelize);
db.pc = require('./pc')(sequelize, Sequelize);

// Relations

module.exports = db;
