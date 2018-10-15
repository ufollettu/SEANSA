'use strict';
const packsSeeds = require('../seeds/packs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sa_pacchetti', packsSeeds, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('sa_pacchetti', null, {});
    }
};
