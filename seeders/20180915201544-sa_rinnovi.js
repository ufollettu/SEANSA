'use strict';
const rinnoviSeeds = require('../seeds/rinnovi');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_rinnovi', rinnoviSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_rinnovi', null, {});
    }
};
