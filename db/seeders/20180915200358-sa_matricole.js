'use strict';
const matricoleSeeds = require('../seeds/matricole');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_matricole', matricoleSeeds, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sa_matricole', null, {});
    }
};
