'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sa_rinnovi', [
        {
            "SR_ID": 38,
            "SR_SS_ID": 33,
            "SR_TS": "2017-03-14 12:15:02"
        },
        {
            "SR_ID": 39,
            "SR_SS_ID": 26,
            "SR_TS": "2017-03-16 09:42:59"
        },
        {
            "SR_ID": 40,
            "SR_SS_ID": 26,
            "SR_TS": "2017-03-16 09:46:10"
        },
        {
            "SR_ID": 41,
            "SR_SS_ID": 37,
            "SR_TS": "2017-04-27 06:35:54"
        },
        {
            "SR_ID": 42,
            "SR_SS_ID": 46,
            "SR_TS": "2017-07-31 12:54:29"
        },
        {
            "SR_ID": 43,
            "SR_SS_ID": 48,
            "SR_TS": "2017-08-22 04:06:52"
        },
        {
            "SR_ID": 44,
            "SR_SS_ID": 52,
            "SR_TS": "2017-10-25 09:42:09"
        },
        {
            "SR_ID": 45,
            "SR_SS_ID": 64,
            "SR_TS": "2017-12-27 07:43:30"
        },
        {
            "SR_ID": 46,
            "SR_SS_ID": 71,
            "SR_TS": "2018-01-19 13:07:42"
        },
        {
            "SR_ID": 47,
            "SR_SS_ID": 33,
            "SR_TS": "2018-03-20 08:06:09"
        },
        {
            "SR_ID": 48,
            "SR_SS_ID": 40,
            "SR_TS": "2018-03-23 09:38:26"
        },
        {
            "SR_ID": 49,
            "SR_SS_ID": 78,
            "SR_TS": "2018-04-03 03:57:22"
        },
        {
            "SR_ID": 50,
            "SR_SS_ID": 39,
            "SR_TS": "2018-04-03 12:23:33"
        },
        {
            "SR_ID": 51,
            "SR_SS_ID": 83,
            "SR_TS": "2018-04-05 11:11:49"
        },
        {
            "SR_ID": 52,
            "SR_SS_ID": 42,
            "SR_TS": "2018-04-12 04:32:47"
        },
        {
            "SR_ID": 53,
            "SR_SS_ID": 38,
            "SR_TS": "2018-05-03 11:47:53"
        },
        {
            "SR_ID": 54,
            "SR_SS_ID": 44,
            "SR_TS": "2018-06-25 12:11:15"
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('sa_rinnovi', null, {});
  }
};