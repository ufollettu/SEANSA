'use strict';
const clientiSeeds = require('../seeds/clienti');

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('sa_clienti', clientiSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_clienti', null, {});
    }
};
