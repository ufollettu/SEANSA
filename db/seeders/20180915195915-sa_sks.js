'use strict';
const sksSeeds = require('../seeds/sks');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_sks', sksSeeds, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('sa_sks', null, {});
    }
};
