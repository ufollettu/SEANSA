'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sa_permessi_utenti', [
        {
            "UP_ID": 7,
            "UP_U_ID": 41,
            "UP_P_ID": 0
        },
        {
            "UP_ID": 8,
            "UP_U_ID": 41,
            "UP_P_ID": 1
        },
        {
            "UP_ID": 9,
            "UP_U_ID": 41,
            "UP_P_ID": 2
        },
        {
            "UP_ID": 10,
            "UP_U_ID": 41,
            "UP_P_ID": 3
        },
        {
            "UP_ID": 11,
            "UP_U_ID": 41,
            "UP_P_ID": 4
        },
        {
            "UP_ID": 12,
            "UP_U_ID": 41,
            "UP_P_ID": 5
        },
        {
            "UP_ID": 13,
            "UP_U_ID": 41,
            "UP_P_ID": 6
        },
        {
            "UP_ID": 14,
            "UP_U_ID": 41,
            "UP_P_ID": 7
        },
        {
            "UP_ID": 15,
            "UP_U_ID": 41,
            "UP_P_ID": 8
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('sa_permessi_utenti', null, {});
  }
};
