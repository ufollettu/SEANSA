const app = require("../app.js");
const supertest = require("supertest");
const expect = require("chai").expect;
const sinon = require("sinon");
const assert = require("assert");
const superactivator = require("../helpers/superactivator");
const sksSeed = require('../seeds/sks');
const pcSeed = require('../seeds/pc');
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
  it("if register is ok, should generate valid key", async function () {
    // here I mock the request.body data
    const license = "7XWqgsXBfvexWNjnMo3Cvdm2g";
    const hwId = "PCSTPC47V6";
    const reqKey = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
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
    const reqKey = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
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
    const reqKey = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
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
  it("if no license, should return error (2)", async function () {
    // here I mock the request.body data
    const license = "";
    const hwId = "";
    const reqKey = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
    const pcDate = moment().format('YYYY-MM-DD');
    const customerName = "pasquale cliente";
    const referenteName = "referente test";
    const referentePhone = "0347/7562188";
    const ip = "";
    const key = await superactivator.registerLicense(
      license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip
    );
    assert.equal(key, "2");
  });
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
  it("if licence is not found, should return 0", async function () {
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
  it("if no pc is found, should return 0", async function () {
    // here I mock the request.body data
    const license = "nc6M0yaj5ZT1CMPBC1Q1s2ktm";
    const hwId = "";
    const reqCode = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
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
    const reqCode = "c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002";
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
    const allowedSerials = "9ea0b20024c3030279a3f201b4f1800006417103dcb202030dabf100d803c302e131b00010f2c0018cdbb303946242022f70a10228334102ca3270011cf14002497233017cb3c3039a32f203e8a30303b475f10160a200029d823303b882c301b478300030318102";
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

// describe("codeToGod()", function () {
//   it("key id 33 should return 1 ", async function () {
//     const serials = "212918#212418";
//     const encoded = await superactivator.codeToGod(serials);
//     assert.equal(encoded, "1");
//   });
// });

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
  it("should decode serials", () => {
    const testStr = superactivator.decodeToMortal(
      "9ea0b20024c3030279a3f201b4f1800006417103dcb202030dabf100d803c302e131b00010f2c0018cdbb303946242022f70a10228334102ca3270011cf14002497233017cb3c3039a32f203e8a30303b475f10160a200029d823303b882c301b478300030318102"
    );
    assert.equal(testStr, "212918#212418");
  });
  // data required for generate licence tests
  it("generatelicense() should decode keyCode", () => {
    const testStr = superactivator.decodeToMortal(
      "1835f242c071c203cc9ca341c80380023b40f040b4c282029fde22401060830163203343e8f181001c5ea24118b040022a00b1406c21010293d86140ecd18103a6ec2143109080028577a1417cf3c301"
    );
    assert.equal(testStr, "tlsoslrkne");
  });
  it("generatelicense() should decode patchKey", () => {
    const testStr = superactivator.decodeToMortal(
      "b86431437020400308cca14274b3020203137243c863820197fe20410c81c102bf62f2427423010008fda043b0d282000aa0f24354430002b7c963412c6283031aafe040142280008555614038934101"
    );
    assert.equal(testStr, "tlsoslrkne");
  });
  it("generatelicense() should decode oem", () => {
    const testStr = superactivator.decodeToMortal(
      "78547242589340033cba21419c128100116820418c82030067f1b341601041005dcbe042d87342013fb2b241ccb20303df6c2340e4514300712761415ca1c101adbfa2413420c0026fbc5141a0f2c0023cbe604164c14200b516e1420870c2024fd0e04344714302cdd732423c524302"
    );
    assert.equal(testStr, "thisisoem_lecu");
  });
  it("generatelicense() should decode keepDate", () => {
    const testStr = superactivator.decodeToMortal(
      "46a173002091420374e373016440c30231b1f103a430c203914a730310f101012473f3038832830278a5300038f043010450f10368b0c0038d26b00030010000"
    );
    assert.equal(testStr, "20190405");
  });
  it("generatelicense() should decode allowedSerials", () => {
    const testStr = superactivator.decodeToMortal(
      "bef0b1008ca08001e993b300dc9100002ad3b3035cb182028d58b00130c2800395b072037490810290faf2020cf380030b8320016c7142003a1132030861c10275e2720358a383014a7271029c92810368a6b2030cc1810111c0b20164e04202546af0010ce20101"
    );
    assert.equal(testStr, "212918#212418");
  });
});
