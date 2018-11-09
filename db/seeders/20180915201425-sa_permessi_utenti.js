'use strict';
const rolesSeeds = require('../seeds/permessi-utenti');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_permessi_utenti', rolesSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_permessi_utenti', null, {});
    }
};
