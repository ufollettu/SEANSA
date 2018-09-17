'use strict';
const pcSeeds = require('../seeds/pc');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_pc', pcSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_pc', null, {});
    }
};
