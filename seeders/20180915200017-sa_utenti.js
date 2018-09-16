'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sa_utenti', [
        {
          "SU_ID": 28,
          "SU_UNA": "lampocar",
          "SU_PAW": "d98f23c21645a261c85968bc708462419220327c",
          "SU_LAST_LOGIN": "2017-03-16 11:04:46",
          "SU_CREATION": "2017-02-22 13:30:39",
          "SU_LAST_EDIT": "2017-03-16 11:04:36",
          "SU_DELETED": 0,
          "SU_LAST_IP": "87.11.50.83"
      },
      {
          "SU_ID": 27,
          "SU_UNA": "daniele@raniero-carrelli.com",
          "SU_PAW": "d98f23c21645a261c85968bc708462419220327c",
          "SU_LAST_LOGIN": "2018-06-25 12:14:14",
          "SU_CREATION": "2017-02-22 09:21:22",
          "SU_LAST_EDIT": "2018-03-05 06:23:19",
          "SU_DELETED": 0,
          "SU_LAST_IP": "95.227.218.39"
      },
      {
          "SU_ID": 26,
          "SU_UNA": "ricercaesviluppo@grsrl.net",
          "SU_PAW": "14c14cc54ecfe01ed5b302432c8bcb74785d2cc6",
          "SU_LAST_LOGIN": "2018-06-13 11:00:59",
          "SU_CREATION": null,
          "SU_LAST_EDIT": "2018-03-05 06:23:14",
          "SU_DELETED": 0,
          "SU_LAST_IP": "92.223.209.171"
      },
      {
          "SU_ID": 29,
          "SU_UNA": "testGR",
          "SU_PAW": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
          "SU_LAST_LOGIN": "2018-07-23 06:02:27",
          "SU_CREATION": "2017-03-14 11:19:41",
          "SU_LAST_EDIT": "2017-09-11 10:58:39",
          "SU_DELETED": 0,
          "SU_LAST_IP": "127.0.0.1"
      },
      {
          "SU_ID": 30,
          "SU_UNA": "ciccio",
          "SU_PAW": "c3240b9898aede89ba5730b4b028355257d7f1d2",
          "SU_LAST_LOGIN": "2017-09-05 09:24:01",
          "SU_CREATION": "2017-09-05 09:23:46",
          "SU_LAST_EDIT": "2018-07-23 06:11:49",
          "SU_DELETED": 0,
          "SU_LAST_IP": "87.6.61.195"
      },
      {
          "SU_ID": 31,
          "SU_UNA": "ufollettu",
          "SU_PAW": "ef13eca66417c36b8d5aaaf6f0f72c3efad1933a",
          "SU_LAST_LOGIN": "2018-08-09 05:18:51",
          "SU_CREATION": "2018-07-23 07:10:52",
          "SU_LAST_EDIT": "2018-07-24 11:32:31",
          "SU_DELETED": 0,
          "SU_LAST_IP": "127.0.0.1"
      },
      {
          "SU_ID": 32,
          "SU_UNA": "reset",
          "SU_PAW": "91ef0c1608b20c9c5bd9e003bbb600229c0dfeb1",
          "SU_LAST_LOGIN": null,
          "SU_CREATION": "2018-07-24 08:56:52",
          "SU_LAST_EDIT": "2018-07-24 08:57:38",
          "SU_DELETED": 0,
          "SU_LAST_IP": null
      },
      {
          "SU_ID": 43,
          "SU_UNA": "testo",
          "SU_PAW": "$2a$10$Sdn72iUrULCnjneg8N7L.OgMNYyfi8YsoezzAy0o6U6DdKGM4XLfK",
          "SU_LAST_LOGIN": "2018-09-14 17:08:53",
          "SU_CREATION": "2018-09-14 17:07:50",
          "SU_LAST_EDIT": "2018-09-14 17:07:50",
          "SU_DELETED": 0,
          "SU_LAST_IP": null
      },
      {
          "SU_ID": 42,
          "SU_UNA": "prova",
          "SU_PAW": "$2a$10$dZcBg4ZbTLvGR74ZPlq.F.1WbnV8tjONuAsivMbPR/kZVMFrW26gS",
          "SU_LAST_LOGIN": "2018-09-14 17:07:17",
          "SU_CREATION": "2018-09-14 17:01:27",
          "SU_LAST_EDIT": "2018-09-14 17:01:27",
          "SU_DELETED": 0,
          "SU_LAST_IP": null
      },
      {
          "SU_ID": 41,
          "SU_UNA": "cane",
          "SU_PAW": "$2a$10$9dtbNM/OTpMACy0ezE3dN.DuR5Imjf3ZoSCZ/XEV6a4x6Lg932zHu",
          "SU_LAST_LOGIN": "2018-09-15 17:57:26",
          "SU_CREATION": "2018-09-14 07:07:36",
          "SU_LAST_EDIT": "2018-09-14 07:07:36",
          "SU_DELETED": 0,
          "SU_LAST_IP": null
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('sa_utenti', null, {});
  }
};
