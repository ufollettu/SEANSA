const app = require("../app.js");
const supertest = require("supertest");
const expect = require("chai").expect;
const sinon = require("sinon");
const assert = require("assert");
const superactivator = require("../helpers/superactivator");
const sksSeed = require('../seeds/sks');
const moment = require("moment");

const db = require("../models");
const rcvpcRepository = require('../repositories/rcvpc.server.repository');

//   const licCheckResult = {
//     key_insesistente: '0',
//     key_info_to_update: '1',
//     server_error: '2',
//     key_unallowed: '3',
//     dates_hacked: '4',
//     key_moved: '5',
//     key_virgin: '6',
//     key_ok: '7',
//     key_expired: '8',
//     invalid_reqcode: '9',
//     hwid_banned: '10'
// }

//
//  Test Suites
// 
describe("checkLicense()", function () {
  beforeEach(async function () {
    await db.sks.destroy({ truncate: true });
    await db.sks.bulkCreate(sksSeed);
  });
  it("sks key inesistente, should return 0", async function () {
    // here I mock the request.body data
    const ip = "";
    const license = "xCbBX5aJAjkzHIYM1W5TlIrYp";
    const hwId = "123490EN40";
    const oem = 12;
    const expDate = "2018-09-30";
    const nowDate = null;
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "0");
  });
  // key ok
  //   {
  //     "SS_ID": 40,
  //     "SS_KEY": "iOV0l9QSoIQF1tIYMrzbcr2jG",
  //     "SS_OEM": 0,
  //     "SS_ACTIVATION_DATE": "2018-03-23T09:28:31.000Z",
  //     "SS_EXPIRE": "2050-03-23",
  //     "SS_CREATED": "2017-03-23T08:35:18.000Z",
  //     "SS_LAST_EDIT": "2018-03-23T09:38:26.000Z",
  //     "SS_MISMATCH_COUNT": 0,
  //     "SS_STATUS": 1,
  //     "SS_SC_ID": 12,
  //     "SS_SP_ID": 15,
  //     "SS_ACTIVATED_BY": "e van gent",
  //     "SS_ACTIVATION_REFERENT": " - "
  // }
  // pc id 15
  // {
  //   "SP_ID": 15,
  //   "SP_HW_ID": "PCWBB1B2G4",
  //   "SP_LAST_RX": "2018-06-22T16:48:47.000Z",
  //   "SP_IP": "77.60.255.156",
  //   "SP_STATUS": 0,
  //   "SP_PC_DATE_TIME": "2018-06-22"
  // }
  it("sks key dates hacked (nowDate = yesterday), should return 4", async function () {
    // this test updates ss_status to 0 and ss_mismatch_count to 1
    // see after test for workaround
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = moment().subtract(1, 'd').format('YYYY-MM-DD'); // yesterday;
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    // only for test, reset sks value to default
    await rcvpcRepository.resetMismatchCount(40);

    assert.equal(foundSks, "4");
  });
  it("sks key info to update (transimtted exp date > key exp Date, nowDate = today), should return 1", async function () {
    // TODO
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2010-03-23";
    const nowDate = moment().format('YYYY-MM-DD'); // today;
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "1");
  });
  it("sks key moved (key hwId != transmitted hwId), should return 5", async function () {
    // this test updates ss_status to 0 and ss_mismatch_count to 1
    // see after test for workaround
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB0B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = "2018-09-15";
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    // only for test, reset sks value to default
    await rcvpcRepository.resetMismatchCount(40);
    assert.equal(foundSks, "5");
  });
  it("sks key ok, should return 7", async function () {
    // TODO
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = "2018-09-15";
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "7");
  });
  // key expired
  //   {
  //     "SS_ID": 45,
  //     "SS_KEY": "afQatg3WMSMaHw56 KjRnPwEZ",
  //     "SS_OEM": 2,
  //     "SS_ACTIVATION_DATE": "2017-07-12 05:02:57",
  //     "SS_EXPIRE": "2018-07-12",
  //     "SS_CREATED": "2017-07-12 04:46:28",
  //     "SS_LAST_EDIT": "2017-07-12 05:06:22",
  //     "SS_MISMATCH_COUNT": 0,
  //     "SS_STATUS": 1,
  //     "SS_SC_ID": 14,
  //     "SS_SP_ID": 19,
  //     "SS_ACTIVATED_BY": "FLORIAN LEGNO SRL",
  //     "SS_ACTIVATION_REFERENT": "VALTER - "
  // },
  // {
  //   "SP_ID": 19,
  //   "SP_HW_ID": "R90N0W8X12",
  //   "SP_LAST_RX": "2017-12-11 15:23:23",
  //   "SP_IP": "89.96.246.132",
  //   "SP_STATUS": 0,
  //   "SP_PC_DATE_TIME": "2017-12-11"
  // },
  it("sks key expired, should return 8", async function () {
    // TODO
    const ip = "89.96.246.132";
    const license = "afQatg3WMSMaHw56 KjRnPwEZ";
    const hwId = "R90N0W8X12";
    const oem = 2;
    const expDate = "2018-07-12";
    const nowDate = "2018-09-15";
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "8");
  });
  // key unallowed
  //   {
  //     "SS_ID": 38,
  //     "SS_KEY": "w7lSDJcJaiYt6gBSRxUahgRUQ",
  //     "SS_OEM": 0,
  //     "SS_ACTIVATION_DATE": "2017-03-14T12:02:45.000Z",
  //     "SS_EXPIRE": "2019-05-03",
  //     "SS_CREATED": "2017-03-14T11:48:22.000Z",
  //     "SS_LAST_EDIT": "2018-05-03T11:47:53.000Z",
  //     "SS_MISMATCH_COUNT": 0,
  //     "SS_STATUS": 0,
  //     "SS_SC_ID": 10,
  //     "SS_SP_ID": 13,
  //     "SS_ACTIVATED_BY": "Lampocar s.r.l.  (PC Florin)",
  //     "SS_ACTIVATION_REFERENT": "Florin "
  // }
  //
  // pc "SS_SP_ID": 13,
  //   {
  //     "SP_ID": 13,
  //     "SP_HW_ID": "PELVKI41V8",
  //     "SP_LAST_RX": "2018-05-03T16:12:01.000Z",
  //     "SP_IP": "80.86.155.16",
  //     "SP_STATUS": 0,
  //     "SP_PC_DATE_TIME": "2018-05-03"
  // }
  it("sks key unallowed (SS_STATUS = 0), should return 3", async function () {
    // TODO : need allowedserials
    const ip = "80.86.155.16";
    const license = "w7lSDJcJaiYt6gBSRxUahgRUQ";
    const hwId = "PELVKI41V8";
    const oem = 0;
    const expDate = "2019-05-03";
    const nowDate = "2018-09-15";
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "3");
  });
  // virgin key
  // {
  //   "SS_ID": 103,
  //   "SS_KEY": "iCbBX5aJAjkzHIYM1W5TlIrYp",
  //   "SS_OEM": 12,
  //   "SS_ACTIVATION_DATE": null,
  //   "SS_EXPIRE": "2018-09-30",
  //   "SS_CREATED": "2018-09-14T05:09:53.000Z",
  //   "SS_LAST_EDIT": "2018-09-14T17:07:32.000Z",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 9,
  //   "SS_SP_ID": 0,
  //   "SS_ACTIVATED_BY": "",
  //   "SS_ACTIVATION_REFERENT": ""
  // }
  it("sks key virgin (SS_SP_ID  = 0), should return 6", async function () {
    const ip = "";
    const license = "iCbBX5aJAjkzHIYM1W5TlIrYp";
    const hwId = "123490EN40";
    const oem = 12;
    const expDate = "2018-09-30";
    const nowDate = null;
    const allowedSerials = null;
    const foundSks = await superactivator.checkLicense(
      license,
      hwId,
      oem,
      expDate,
      nowDate,
      ip,
      allowedSerials
    );
    assert.equal(foundSks, "6");
  });
});

describe("updatePcRx()", function () {
  it("hwId 4805420112 should return 1 ", async function () {
    const hwId = "4805420112";
    const ip = "80.86.155.16";
    const nowDate = "2018-06-25";
    const foundPc = await superactivator.updatePcRx(hwId, ip, nowDate);
    assert.equal(foundPc, "1");
  });
  it("hwId, ip and nowDate undefined should return 1 ", async function () {
    const hwId = undefined;
    const ip = undefined;
    const nowDate = undefined;
    const foundPc = await superactivator.updatePcRx(hwId, ip, nowDate);
    assert.equal(foundPc, "1");
  });
});

describe("checksetBanned()", function () {
  it("hwId PFXJT028J4 should return 1 ", async function () {
    const hwId = "PFXJT028J4";
    const foundBannedPc = await superactivator.checksetBanned(hwId);
    assert.equal(foundBannedPc, "1");
  });
  it("hwId None123456 should return 0 ", async function () {
    const hwId = "None123456";
    const foundBannedPc = await superactivator.checksetBanned(hwId);
    assert.equal(foundBannedPc, "0");
  });
});

describe("getAllowedSerials()", function () {
  it("key id 33 should return 123456789#983106 ", async function () {
    const keyId = 33;
    const foundSerials = await superactivator.getAllowedSerials(keyId);
    assert.equal(foundSerials, "123456789#983106");
  });
  it("key id 32 should return '' ", async function () {
    const keyId = 32;
    const foundSerials = await superactivator.getAllowedSerials(keyId);
    assert.equal(foundSerials, "");
  });
});

describe("generateValidKey()", function () {
  it("should return almozlakee ", function () {
    const key = "ammazzate";
    const validKey = superactivator.generateValidKey(key);
    assert.equal(validKey, "almozlakee");
  });
  it("should return mltodlckie ", function () {
    const key = "motedicoio";
    const validKey = superactivator.generateValidKey(key);
    assert.equal(validKey, "mltodlckie");
  });
});

describe("generateValidKey()", function () {
  it("should return OK ", function () {
    const checkKey = "almozlakee";
    const patKey = "almozlakee";
    const validKey = superactivator.checkValidKey(checkKey, patKey);
    assert.equal(validKey, "OK");
  });
  it("should return KO (different keys)", function () {
    const checkKey = "almozlakee";
    const patKey = "almozlake";
    const validKey = superactivator.checkValidKey(checkKey, patKey);
    assert.equal(validKey, "KO");
  });
  it("should return KO (too short keys)", function () {
    const checkKey = "almoz";
    const patKey = "almoz";
    const validKey = superactivator.checkValidKey(checkKey, patKey);
    assert.equal(validKey, "KO");
  });
});

describe("setKeyMismatched()", function () {
  it("key id 33 should return 1 ", async function () {
    const id = 33;
    const mismatch = await superactivator.setKeyMismatched(id);
    assert.equal(mismatch, "1");
  });
  it("key id 932 should return 0 ", async function () {
    const id = 932;
    const mismatch = await superactivator.setKeyMismatched(id);
    assert.equal(mismatch, "0");
  });
  it("key id undefined should return sql error ", async function () {
    const id = undefined;
    const mismatch = await superactivator.setKeyMismatched(id);
    assert.equal(mismatch, undefined);
  });
});

describe("decodeToMortal()", () => {
  it("should decode reqcode string 1", () => {
    const testStr = superactivator.decodeToMortal(
      "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002"
    );
    assert.equal(testStr, "teststringa");
  });
  it("should decode reqcode string 2", () => {
    const testStr = superactivator.decodeToMortal(
      "1086334168310002b526a1432c5001029b70f340e05300015cf6704258e342023752f34268a38301b4d6b240048200027ea3b04298818303052be04140f141036a3f214128734302db4462406cd081013532e04120e1c001"
    );
    assert.equal(testStr, "teststringa");
  });
  it("should decode reqcode string 3", () => {
    const testStr = superactivator.decodeToMortal(
      "38863240180083004de66342bc5343015b73324350e20002d8c6f0430cf2c1000f2132400072c303b0167043e0f0010372a3b2432860820171c86241a4e28200165ca341c0e3c3018b54a2402003c202d1a0e041e4038300"
    );
    assert.equal(testStr, "teststringa");
  });
  it("should decode reqcode string 4", () => {
    const testStr = superactivator.decodeToMortal(
      "6807b14270e2c102ad54a140f8e34003e3e17041e49041035ca63042941381023352b340e8b142022095b242acd20302fa403341f0730103a57ba04024e2c202ce3ce2404851c203d73663431ce10103bd012242e800c300"
    );
    assert.equal(testStr, "teststringa");
  });
  it("should decode reqcode string 5", () => {
    const testStr = superactivator.decodeToMortal(
      "f894f340e0d2c10235b5604348b04101e7a3334144b3430168a6f1427060800317533042a8f24200dcb53242fc9142035e53b140a8124101556be1438c628003c6ade14360038202cb64e0432cf2c0036522e141aca30003"
    );
    assert.equal(testStr, "teststringa");
  });
});
