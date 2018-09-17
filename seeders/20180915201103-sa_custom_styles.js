'use strict';
const styleSeeds = require('../seeds/custom-styles');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_custom_styles', styleSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_custom_styles', null, {});
    }
};
