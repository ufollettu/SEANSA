'use strict';
const utentiSeeds = require('../seeds/utenti');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_utenti', utentiSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_utenti', null, {});
    }
};
