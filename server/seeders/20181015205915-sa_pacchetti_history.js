'use strict';
const packsHistorySeeds = require('../seeds/packs-history');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_pacchetti_history', packsHistorySeeds, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('sa_pacchetti_history', null, {});
    }
};
