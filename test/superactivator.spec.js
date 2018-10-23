const app = require("../app.js");
const supertest = require("supertest");
const expect = require("chai").expect;
const sinon = require("sinon");
const assert = require("assert");
const superactivator = require("../helpers/superactivator");
const sksSeed = require('../seeds/sks');
const pcSeed = require('../seeds/pc');
const packsSeed = require('../seeds/packs');
const packsHistorySeed = require('../seeds/packs-history');
const matricoleSeed = require('../seeds/matricole');
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
describe("registerLicense()", function () {
  beforeEach(async function () {
    await db.pc.destroy({ where: {}, truncate: true });
    await db.pc.bulkCreate(pcSeed);
    await db.matricole.destroy({ where: {}, truncate: true });
    await db.matricole.bulkCreate(matricoleSeed);
    await db.sks.destroy({ where: {}, truncate: true });
    await db.sks.bulkCreate(sksSeed);
  });
  it("if license hacked, should return key inesistente", async function () {
    // here I mock the request.body data
    const license = "vH58Munqx0hoIhIQNZI0KQnt4";
    const hwId = "123490EN40";
    const reqKey = "6502310096217001678272001094B002298AB10118007101294680428AAD01404486700118913002";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "ciao caro";
    const referenteName = "";
    const referentePhone = "";
    const ip = "127.0.0.1";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    assert.equal(key, "0");
  });
  it("if register is ok, should generate valid key", async function () {
    // here I mock the request.body data
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const reqKey = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "pasquale cliente";
    const referenteName = "referente test";
    const referentePhone = "0347/7562188";
    const ip = "95.227.218.39";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    const keyArr = key.split('|');
    keyArr.forEach((code, i) => {
      keyArr[i] = superactivator.decodeToMortal(code);
    })
    assert.deepEqual(keyArr, ['tlsoslrkne', 'tlsoslrkne', 'thisisoem_lecu', '20190405', '212918#212418']);

  });
  it("if no customer data, should return valid key with no customer data", async function () {
    // here I mock the request.body data
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const reqKey = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "";
    const referenteName = "";
    const referentePhone = "";
    const ip = "95.227.218.39";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    const keyArr = key.split('|');
    keyArr.forEach((code, i) => {
      keyArr[i] = superactivator.decodeToMortal(code);
    })
    assert.deepEqual(keyArr, ['tlsoslrkne', 'tlsoslrkne', 'thisisoem_lecu', '20190405', '212918#212418']);
  });
  it("if no pc, should create new pc and return valid key", async function () {
    // here I mock the request.body data
    const license = "nc6M0yaj5ZT1CMPBC1Q1s2ktm";
    const hwId = "";
    const reqKey = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "pasquale cliente";
    const referenteName = "referente test";
    const referentePhone = "0347/7562188";
    const ip = "";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    const keyArr = key.split('|');
    keyArr.forEach((code, i) => {
      keyArr[i] = superactivator.decodeToMortal(code);
    })
    assert.deepEqual(keyArr, ['tlsoslrkne', 'tlsoslrkne', 'thisisnotoem_lecu', '20200101', '']);
  });
  it("if no reqcode, should return invalide_reqcode error (9)", async function () {
    // here I mock the request.body data
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "";
    const reqKey = "";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "pasquale cliente";
    const referenteName = "referente test";
    const referentePhone = "0347/7562188";
    const ip = "";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    assert.equal(key, "9");
  });
  it("if no license, should return key inesistente (0)", async function () {
    // here I mock the request.body data
    const license = "";
    const hwId = "";
    const reqKey = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "pasquale cliente";
    const referenteName = "referente test";
    const referentePhone = "0347/7562188";
    const ip = "";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    assert.equal(key, "0");
  })
});


describe("generateLicense()", function () {
  beforeEach(async function () {
    await db.pc.destroy({ where: {}, truncate: true });
    await db.pc.bulkCreate(pcSeed);
    await db.matricole.destroy({ where: {}, truncate: true });
    await db.matricole.bulkCreate(matricoleSeed);
    await db.sks.destroy({ where: {}, truncate: true });
    await db.sks.bulkCreate(sksSeed);
  });

  it("test with old reqcode, should return key", async function () {
    // here I mock the request.body data
    const license = "vH58Munqx0GdIhIQNZI0KQnt4";
    const hwId = "123490EN40";
    const reqCode = "51113001AA117101A7A0310208547101894A3102A4A07002896681425A8E02410455B102A8917200";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "127.0.0.1";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    const keyArr = key.split('|');
    keyArr.forEach((code, i) => {
      keyArr[i] = superactivator.decodeToMortal(code);
    })
    assert.deepEqual(keyArr, ['1l3o9lEk4e', '1l3o9lEk4e', 'thisisoem_lecu', '20191010', '']);
  });
  it("test with old reqcode and hacked license, should return 0", async function () {
    // here I mock the request.body data
    const license = "zH58Munqx0GdIhIQNZI0KQnt4";
    const hwId = "123490EN40";
    const reqCode = "51113001AA117101A7A0310208547101894A3102A4A07002896681425A8E02410455B102A8917200";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "127.0.0.1";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "0");
  });
  it("test with old reqcode and wrong argument, should return 2", async function () {
    // here I mock the request.body data
    const license = "vH58Munqx0GdIhIQNZI0KQnt4";
    const hwId = { "123490EN40": "nds" };
    const reqCode = "51113001AA117101A7A0310208547101894A3102A4A07002896681425A8E02410455B102A8917200";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "127.0.0.1";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "0");
  });
  it("if licence is not set, should return 0", async function () {
    // here I mock the request.body data
    const license = "";
    const hwId = "";
    const reqCode = "";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "0");
  });
  it("if licence is not found, should return 0", async function () {
    // here I mock the request.body data
    const license = "vH58Munqx0hoIhIQNZI0KQnt4";
    const hwId = "123490EN40";
    const reqCode = "6502310096217001678272001094B002298AB10118007101294680428AAD01404486700118913002";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "0");
  });
  it("if no pc is found, should return 0", async function () {
    // here I mock the request.body data
    const license = "nc6M0yaj5ZT1CMPBC1Q1s2ktm";
    const hwId = "";
    const reqCode = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "0");
  });
  it("if reqCode is not valid, should return 9", async function () {
    // here I mock the request.body data
    const license = "nc6M0yaj5ZT1CMPBC1Q1s2ktm";
    const hwId = "PFKBPG31W9";
    const reqCode = "";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "92.223.209.171";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    assert.equal(key, "9");
  });
  it("if generation ok should return valid key", async function () {
    // here I mock the request.body data
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const reqCode = "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const ip = "95.227.218.39";
    const key = await superactivator.generateLicense(
      license, hwId, reqCode, nowDate, ip
    );
    const keyArr = key.split('|');
    keyArr.forEach((code, i) => {
      keyArr[i] = superactivator.decodeToMortal(code);
    })
    assert.deepEqual(keyArr, ['tlsoslrkne', 'tlsoslrkne', 'thisisoem_lecu', '20190405', '212918#212418']);
  });
})

describe("checkLicense()", function () {
  beforeEach(async function () {
    await db.pc.destroy({ where: {}, truncate: true });
    await db.pc.bulkCreate(pcSeed);
    await db.matricole.destroy({ where: {}, truncate: true });
    await db.matricole.bulkCreate(matricoleSeed);
    await db.sks.destroy({ where: {}, truncate: true });
    await db.sks.bulkCreate(sksSeed);
    await db.pacchetti.destroy({ where: {}, truncate: true });
    await db.pacchetti.bulkCreate(packsSeed);
    await db.pacchettiHistory.destroy({ where: {}, truncate: true });
    await db.pacchettiHistory.bulkCreate(packsHistorySeed);
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
  // {
  //   "SS_ID": 40,
  //   "SS_KEY": "iOV0l9QSoIQF1tIYMrzbcr2jG",
  //   "SS_OEM": 0,
  //   "SS_ACTIVATION_DATE": "2018-03-23T09:28:31.000Z",
  //   "SS_EXPIRE": "2050-03-23",
  //   "SS_CREATED": "2017-03-23T08:35:18.000Z",
  //   "SS_LAST_EDIT": "2018-03-23T09:38:26.000Z",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 12,
  //   "SS_SP_ID": 15,
  //   "SS_ACTIVATED_BY": "e van gent",
  //   "SS_ACTIVATION_REFERENT": " - "
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
  it("sks key dates hacked (nowDate = day before yesterday), should return 4", async function () {
    // this test updates ss_status to 0 and ss_mismatch_count to 1
    // see after test for workaround
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = moment().subtract(2, 'd').format('YYYY-MM-DD'); // day before yesterday; 
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
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2010-03-23";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
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
    const nowDate = moment().format('YYYY-MM-DD');
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
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = moment().format('YYYY-MM-DD');
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
    const ip = "89.96.246.132";
    const license = "afQatg3WMSMaHw56 KjRnPwEZ";
    const hwId = "R90N0W8X12";
    const oem = 2;
    const expDate = "2018-07-12";
    const nowDate = moment().format('YYYY-MM-DD');
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
  // {
  //   "SS_ID": 33,
  //   "SS_KEY": "uMuxbIjBqMQTrf6iRoAYXraz7",
  //   "SS_OEM": 12,
  //   "SS_ACTIVATION_DATE": "2018-03-05 06:22:12",
  //   "SS_EXPIRE": "2020-01-01",
  //   "SS_CREATED": "2017-02-22 13:33:16",
  //   "SS_LAST_EDIT": "2018-09-05 09:48:40",
  //   "SS_MISMATCH_COUNT": 61,
  //   "SS_STATUS": 0,
  //   "SS_SC_ID": 9,
  //   "SS_SP_ID": 7,
  //   "SS_ACTIVATED_BY": "GR s.r.l.",
  //   "SS_ACTIVATION_REFERENT": "Daniele Parazza - "
  // },
  //
  // pc "SS_SP_ID": 7,
  //   {
  //     "SP_ID": 7,
  //     "SP_HW_ID": "PFKBPG31W9",
  //     "SP_LAST_RX": "2018-06-07 08:35:32",
  //     "SP_IP": "92.223.209.171",
  //     "SP_STATUS": 0,
  //     "SP_PC_DATE_TIME": "2018-06-07"
  // },
  it("sks key unallowed (SS_STATUS = 0), should return 3", async function () {
    const ip = "92.223.209.171";
    const license = "uMuxbIjBqMQTrf6iRoAYXraz7";
    const hwId = "PFKBPG31W9";
    const oem = 12;
    const expDate = "2020-01-01";
    const nowDate = moment().format('YYYY-MM-DD');
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
  //   "SS_ID": 75,
  //   "SS_KEY": "3Q9DHcP0TyY5dHfays0iv5VNE",
  //   "SS_OEM": 0,
  //   "SS_ACTIVATION_DATE": null,
  //   "SS_EXPIRE": "2050-02-22",
  //   "SS_CREATED": "2018-03-07 15:03:34",
  //   "SS_LAST_EDIT": "2018-03-07 15:03:34",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 12,
  //   "SS_SP_ID": 0,
  //   "SS_ACTIVATED_BY": "",
  //   "SS_ACTIVATION_REFERENT": ""
  // },
  it("sks key virgin (SS_SP_ID  = 0), should return 6", async function () {
    const ip = "";
    const license = "3Q9DHcP0TyY5dHfays0iv5VNE";
    const hwId = "";
    const oem = 0;
    const expDate = "2050-02-22";
    const nowDate = moment().format('YYYY-MM-DD');
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

  // {
  //   "SS_ID": 82,
  //   "SS_KEY": "7XWqgsXBfvexWNjnMo3Cvdm2g",
  //   "SS_OEM": 12,
  //   "SS_ACTIVATION_DATE": "2018-04-06 12:00:00",
  //   "SS_EXPIRE": "2019-04-05",
  //   "SS_CREATED": "2018-04-05 10:30:16",
  //   "SS_LAST_EDIT": "2018-04-23 06:04:39",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 23,
  //   "SS_SP_ID": 33,
  //   "SS_ACTIVATED_BY": "Officina del Carrello",
  //   "SS_ACTIVATION_REFERENT": "Andrea - officina@officinadelcarrello.it"
  // },
  it("sks allowed serials not ok (123456789#983106), should return 1", async function () {
    // correct serials = 212918#212418
    const ip = "95.227.218.39";
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const oem = 12;
    const expDate = "2019-04-05";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = "123456789#983106";
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

  it("sks allowed serials ok (212918#212418), should return 7", async function () {
    // correct serials = 212918#212418
    const ip = "95.227.218.39";
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const oem = 12;
    const expDate = "2019-04-05";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = "b6a07203dd43f0017af2b2039dea72029102f102ac6b7001d360a202a6b3b003559071036e50b2038c257100a90171012c4af200";
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
  it("pack expired, should return 8", async function () {
    const ip = "31.157.56.160";
    const license = "r3K81iAEzCLCjSpawI105exCT";
    const hwId = "B5 NRRN123";
    const oem = 10;
    const expDate = "2019-05-28";
    const nowDate = moment().format('YYYY-MM-DD');
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
});

describe("classicCheck()", function () {
  beforeEach(async function () {
    await db.pc.destroy({ where: {}, truncate: true });
    await db.pc.bulkCreate(pcSeed);
    await db.matricole.destroy({ where: {}, truncate: true });
    await db.matricole.bulkCreate(matricoleSeed);
    await db.sks.destroy({ where: {}, truncate: true });
    await db.sks.bulkCreate(sksSeed);
  });
  // it("sks key inesistente, should return 0", async function () {
  //   // here I mock the request.body data
  //   const ip = "";
  //   const license = "xCbBX5aJAjkzHIYM1W5TlIrYp";
  //   const hwId = "123490EN40";
  //   const oem = 12;
  //   const expDate = "2018-09-30";
  //   const nowDate = null;
  //   const allowedSerials = null;
  //   const foundSks = await superactivator.classicCheck(
  //     license,
  //     hwId,
  //     oem,
  //     expDate,
  //     nowDate,
  //     ip,
  //     allowedSerials
  //   );
  //   assert.equal(foundSks, "0");
  // });
  // key ok
  // {
  //   "SS_ID": 40,
  //   "SS_KEY": "iOV0l9QSoIQF1tIYMrzbcr2jG",
  //   "SS_OEM": 0,
  //   "SS_ACTIVATION_DATE": "2018-03-23T09:28:31.000Z",
  //   "SS_EXPIRE": "2050-03-23",
  //   "SS_CREATED": "2017-03-23T08:35:18.000Z",
  //   "SS_LAST_EDIT": "2018-03-23T09:38:26.000Z",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 12,
  //   "SS_SP_ID": 15,
  //   "SS_ACTIVATED_BY": "e van gent",
  //   "SS_ACTIVATION_REFERENT": " - "
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
  it("sks key dates hacked (nowDate = day before yesterday), should return 4", async function () {
    // this test updates ss_status to 0 and ss_mismatch_count to 1
    // see after test for workaround
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = moment().subtract(2, 'd').format('YYYY-MM-DD'); // day before yesterday; 
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2010-03-23";
    const nowDate = moment().format('YYYY-MM-DD');  // today;
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
    const ip = "77.60.255.156";
    const license = "iOV0l9QSoIQF1tIYMrzbcr2jG";
    const hwId = "PCWBB1B2G4";
    const oem = 0;
    const expDate = "2050-03-23";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
    const ip = "89.96.246.132";
    const license = "afQatg3WMSMaHw56 KjRnPwEZ";
    const hwId = "R90N0W8X12";
    const oem = 2;
    const expDate = "2018-07-12";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
  // {
  //   "SS_ID": 33,
  //   "SS_KEY": "uMuxbIjBqMQTrf6iRoAYXraz7",
  //   "SS_OEM": 12,
  //   "SS_ACTIVATION_DATE": "2018-03-05 06:22:12",
  //   "SS_EXPIRE": "2020-01-01",
  //   "SS_CREATED": "2017-02-22 13:33:16",
  //   "SS_LAST_EDIT": "2018-09-05 09:48:40",
  //   "SS_MISMATCH_COUNT": 61,
  //   "SS_STATUS": 0,
  //   "SS_SC_ID": 9,
  //   "SS_SP_ID": 7,
  //   "SS_ACTIVATED_BY": "GR s.r.l.",
  //   "SS_ACTIVATION_REFERENT": "Daniele Parazza - "
  // },
  //
  // pc "SS_SP_ID": 7,
  //   {
  //     "SP_ID": 7,
  //     "SP_HW_ID": "PFKBPG31W9",
  //     "SP_LAST_RX": "2018-06-07 08:35:32",
  //     "SP_IP": "92.223.209.171",
  //     "SP_STATUS": 0,
  //     "SP_PC_DATE_TIME": "2018-06-07"
  // },
  it("sks key unallowed (SS_STATUS = 0), should return 3", async function () {
    const ip = "92.223.209.171";
    const license = "uMuxbIjBqMQTrf6iRoAYXraz7";
    const hwId = "PFKBPG31W9";
    const oem = 12;
    const expDate = "2020-01-01";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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
  //   "SS_ID": 75,
  //   "SS_KEY": "3Q9DHcP0TyY5dHfays0iv5VNE",
  //   "SS_OEM": 0,
  //   "SS_ACTIVATION_DATE": null,
  //   "SS_EXPIRE": "2050-02-22",
  //   "SS_CREATED": "2018-03-07 15:03:34",
  //   "SS_LAST_EDIT": "2018-03-07 15:03:34",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 12,
  //   "SS_SP_ID": 0,
  //   "SS_ACTIVATED_BY": "",
  //   "SS_ACTIVATION_REFERENT": ""
  // },
  it("sks key virgin (SS_SP_ID  = 0), should return 6", async function () {
    const ip = "";
    const license = "3Q9DHcP0TyY5dHfays0iv5VNE";
    const hwId = "";
    const oem = 0;
    const expDate = "2050-02-22";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = null;
    const foundSks = await superactivator.classicCheck(
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

  // {
  //   "SS_ID": 82,
  //   "SS_KEY": "7XWqgsXBfvexWNjnMo3Cvdm2g",
  //   "SS_OEM": 12,
  //   "SS_ACTIVATION_DATE": "2018-04-06 12:00:00",
  //   "SS_EXPIRE": "2019-04-05",
  //   "SS_CREATED": "2018-04-05 10:30:16",
  //   "SS_LAST_EDIT": "2018-04-23 06:04:39",
  //   "SS_MISMATCH_COUNT": 0,
  //   "SS_STATUS": 1,
  //   "SS_SC_ID": 23,
  //   "SS_SP_ID": 33,
  //   "SS_ACTIVATED_BY": "Officina del Carrello",
  //   "SS_ACTIVATION_REFERENT": "Andrea - officina@officinadelcarrello.it"
  // },
  it("sks allowed serials not ok (123456789#983106), should return 1", async function () {
    // correct serials = 212918#212418
    const ip = "95.227.218.39";
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const oem = 12;
    const expDate = "2019-04-05";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = "123456789#983106";
    const foundSks = await superactivator.classicCheck(
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

  it("sks allowed serials ok (212918#212418), should return 7", async function () {
    // correct serials = 212918#212418
    const ip = "95.227.218.39";
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const oem = 12;
    const expDate = "2019-04-05";
    const nowDate = moment().format('YYYY-MM-DD');
    const allowedSerials = "b6a07203dd43f0017af2b2039dea72029102f102ac6b7001d360a202a6b3b003559071036e50b2038c257100a90171012c4af200";
    const foundSks = await superactivator.classicCheck(
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
  it("null hwId should return 0 ", async function () {
    const hwId = null;
    const foundBannedPc = await superactivator.checksetBanned(hwId);
    assert.equal(foundBannedPc, "0");
  });
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

describe("checkPack()", function () {
  it("lic id 138 should return packId 1 ", async function () {
    const licenseId = 138;
    const foundPack = await superactivator.checkPack(licenseId);
    assert.equal(foundPack, "1" );
  });
  it("lic id 96 should return packId 2 ", async function () {
    const licenseId = 96;
    const foundPack = await superactivator.checkPack(licenseId);
    assert.equal(foundPack, "2" );
  });
  it("lic id 40 should return 0 (not found)", async function () {
    const licenseId = 40;
    const foundPack = await superactivator.checkPack(licenseId);
    assert.equal(foundPack, "0");
  });
  it("lic id null should return 0 ", async function () {
    const licenseId = null;
    const foundPack = await superactivator.checkPack(licenseId);
    assert.equal(foundPack, "0");
  });
});

describe("getAllowedSerials()", function () {
  it("key id 33 should return 123456789#983106 ", async function () {
    const keyId = 33;
    const foundSerials = await superactivator.getAllowedSerials(keyId);
    assert.equal(foundSerials, "123456789#983106");
  });
  it("key id 82 should return 212918#212418", async function () {
    const keyId = 82;
    const foundSerials = await superactivator.getAllowedSerials(keyId);
    assert.equal(foundSerials, "212918#212418");
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

describe("checkValidKey()", function () {
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

// describe("codeToGod()", function () {
//   it("key id 33 should return 1 ", async function () {
//     const serials = "212918#212418";
//     const encoded = await superactivator.codeToGod(serials);
//     assert.equal(encoded, "1");
//   });
// });

describe("decodeToMortal()", () => {
  // data required for generate licence tests
  it("generatelicense() should decode keyCode", () => {
    const testStr = superactivator.decodeToMortal(
      "b836b0423cdd6342fb507142ebdc2143db83f143144de141fe007143332ae142562ce1406156a043"
    );
    assert.equal(testStr, "tlsoslrkne");
  });
  it("generatelicense() should decode patchKey", () => {
    const testStr = superactivator.decodeToMortal(
      "087631435c7c6342b770f243ef4fe341db91f242ecffe2409622f141a3982342caec624201f46143"
    );
    assert.equal(testStr, "tlsoslrkne");
  });
  it("generatelicense() should decode oem", () => {
    const testStr = superactivator.decodeToMortal(
      "04c4f043c8d8604091b9e1439f02724031ca61433f513142dbcce14261b7e243c11fa1406fcfd342e48e2240d9f6e340af11a0412da67140"
    );
    assert.equal(testStr, "thisisoem_lecu");
  });
  it("generatelicense() should decode keepDate", () => {
    const testStr = superactivator.decodeToMortal(
      "86033000a4937103bde0f00399187203a4d1b0021435b100d4c0f30221557303"
    );
    assert.equal(testStr, "20190405");
  });
  it("generatelicense() should decode allowedSerials", () => {
    const testStr = superactivator.decodeToMortal(
      "b6a07203dd43f0017af2b2039dea72029102f102ac6b7001d360a202a6b3b003559071036e50b2038c257100a90171012c4af200"
    );
    assert.equal(testStr, "212918#212418");
  });
});


describe("codeToGod() NB deve passare decodeToMortal()", () => {
  it("should decode reqcode string 1", () => {
    const encoded = superactivator.codeToGod("qualcosa a caso");
    const decoded = superactivator.decodeToMortal(encoded);
    assert.equal(decoded, "qualcosa a caso");
  });
});