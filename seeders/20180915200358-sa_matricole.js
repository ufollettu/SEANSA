'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sa_matricole',[
        {
          "sm_id": 1,
          "SM_MATRICOLA": 123456789,
          "SM_SS_ID": 33,
          "SM_DETTAGLI": "Test matricola",
          "SM_CREATION_DATE": "2018-03-05 08:32:10",
          "SM_LAST_UPDATE": "2018-03-05 06:32:10"
      },
      {
          "sm_id": 2,
          "SM_MATRICOLA": 983106,
          "SM_SS_ID": 33,
          "SM_DETTAGLI": "banco lecu daniele",
          "SM_CREATION_DATE": "2018-03-20 10:04:58",
          "SM_LAST_UPDATE": "2018-03-20 08:04:58"
      },
      {
          "sm_id": 3,
          "SM_MATRICOLA": 212918,
          "SM_SS_ID": 82,
          "SM_DETTAGLI": "RH70 Bonfiglioli",
          "SM_CREATION_DATE": "2018-04-05 14:31:57",
          "SM_LAST_UPDATE": "2018-04-05 10:31:57"
      },
      {
          "sm_id": 4,
          "SM_MATRICOLA": 212418,
          "SM_SS_ID": 82,
          "SM_DETTAGLI": "DH150",
          "SM_CREATION_DATE": "2018-04-05 14:31:57",
          "SM_LAST_UPDATE": "2018-04-05 10:31:57"
      },
      {
          "sm_id": 5,
          "SM_MATRICOLA": 213118,
          "SM_SS_ID": 83,
          "SM_DETTAGLI": "AC90-9-CO 80 Volt",
          "SM_CREATION_DATE": "2018-04-05 14:36:33",
          "SM_LAST_UPDATE": "2018-04-05 10:36:33"
      },
      {
          "sm_id": 6,
          "SM_MATRICOLA": 987654321,
          "SM_SS_ID": 89,
          "SM_DETTAGLI": "",
          "SM_CREATION_DATE": "2018-04-18 08:38:34",
          "SM_LAST_UPDATE": "2018-04-18 04:38:34"
      },
      {
          "sm_id": 7,
          "SM_MATRICOLA": 123456789,
          "SM_SS_ID": 89,
          "SM_DETTAGLI": "",
          "SM_CREATION_DATE": "2018-04-18 08:38:34",
          "SM_LAST_UPDATE": "2018-04-18 04:38:34"
      },
      {
          "sm_id": 8,
          "SM_MATRICOLA": 12345,
          "SM_SS_ID": 78,
          "SM_DETTAGLI": "",
          "SM_CREATION_DATE": "2018-04-18 08:50:55",
          "SM_LAST_UPDATE": "2018-04-18 04:50:55"
      },
      {
          "sm_id": 9,
          "SM_MATRICOLA": 987654,
          "SM_SS_ID": 78,
          "SM_DETTAGLI": "",
          "SM_CREATION_DATE": "2018-04-18 08:51:57",
          "SM_LAST_UPDATE": "2018-04-18 04:51:57"
      },
      {
          "sm_id": 10,
          "SM_MATRICOLA": 11111111,
          "SM_SS_ID": 78,
          "SM_DETTAGLI": "",
          "SM_CREATION_DATE": "2018-04-18 09:19:21",
          "SM_LAST_UPDATE": "2018-04-18 05:19:21"
      },
      {
          "sm_id": 11,
          "SM_MATRICOLA": 983106,
          "SM_SS_ID": 89,
          "SM_DETTAGLI": "banco test GR",
          "SM_CREATION_DATE": "2018-04-18 09:26:13",
          "SM_LAST_UPDATE": "2018-04-18 05:26:13"
      },
      {
          "sm_id": 13,
          "SM_MATRICOLA": 212418,
          "SM_SS_ID": 86,
          "SM_DETTAGLI": "DH150",
          "SM_CREATION_DATE": "2018-04-23 10:01:27",
          "SM_LAST_UPDATE": "2018-04-23 06:01:27"
      },
      {
          "sm_id": 14,
          "SM_MATRICOLA": 212918,
          "SM_SS_ID": 86,
          "SM_DETTAGLI": "RH70B_Bonfiglioli",
          "SM_CREATION_DATE": "2018-04-23 10:02:34",
          "SM_LAST_UPDATE": "2018-04-23 06:02:34"
      },
      {
          "sm_id": 15,
          "SM_MATRICOLA": 214418,
          "SM_SS_ID": 94,
          "SM_DETTAGLI": "RB60-C-SBE 96V",
          "SM_CREATION_DATE": "2018-05-09 16:41:41",
          "SM_LAST_UPDATE": "2018-05-09 12:41:41"
      },
      {
          "sm_id": 16,
          "SM_MATRICOLA": 214318,
          "SM_SS_ID": 94,
          "SM_DETTAGLI": "RB60-C-SBE 96V",
          "SM_CREATION_DATE": "2018-05-09 16:41:41",
          "SM_LAST_UPDATE": "2018-05-09 12:41:41"
      },
      {
          "sm_id": 17,
          "SM_MATRICOLA": 211817,
          "SM_SS_ID": 100,
          "SM_DETTAGLI": "AC70 MVC 96V",
          "SM_CREATION_DATE": "2018-06-06 15:01:02",
          "SM_LAST_UPDATE": "2018-06-06 11:01:02"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('sa_matricole', null, {});
  }
};
