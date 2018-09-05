const app = require('../app.js');
const supertest = require('supertest')
const expect = require('chai').expect;
const sinon = require('sinon');
const assert = require('assert');
const superactivator = require('../helpers/superactivator');

const db = require('../models');

// 
//  Test Suites
// 
describe('checkLicense()', function () {
    it('sks ', async function () {
        const ip = '127.0.0.1';
        const license = "A2YyLM8i3G7feJt7Hlm8hxlYk";
        const hwId = "123490EN40";
        const oem = 12;
        const expDate = "2019-10-10";
        const nowDate = null; // "2018-09-05"
        const allowedSerials = null;

        const foundSks = await superactivator.checkLicensecheckLicense(license, hwId, oem, expDate, nowDate, ip, allowedSerials, res)
        assert.equal(foundSks, '1');
    });
});

describe('updatePcRx()', function () {
    it('hwId 4805420112 should return 1 ', async function () {
        const hwId = '4805420112';
        const ip = '80.86.155.16';
        const nowDate = '2018-06-25';
        const foundPc = await superactivator.updatePcRx(hwId, ip, nowDate)
        assert.equal(foundPc, '1');
    });
    it('hwId, ip and nowDate undefined should return 1 ', async function () {
        const hwId = undefined;
        const ip = undefined;
        const nowDate = undefined;
        const foundPc = await superactivator.updatePcRx(hwId, ip, nowDate)
        assert.equal(foundPc, '1');
    });
});

describe('checksetBanned()', function () {
    it('hwId PFXJT028J4 should return 1 ', async function () {
        const hwId = 'PFXJT028J4';
        const foundBannedPc = await superactivator.checksetBanned(hwId)
        assert.equal(foundBannedPc, '1');
    });
    it('hwId None123456 should return 0 ', async function () {
        const hwId = 'None123456';
        const foundBannedPc = await superactivator.checksetBanned(hwId)
        assert.equal(foundBannedPc, '0');
    });
});

describe('getAllowedSerials()', function () {
    it('key id 33 should return 123456789#983106 ', async function () {
        const keyId = 33;
        const foundSerials = await superactivator.getAllowedSerials(keyId)
        assert.equal(foundSerials, '123456789#983106');
    });
    it('key id 32 should return \'\' ', async function () {
        const keyId = 32;
        const foundSerials = await superactivator.getAllowedSerials(keyId)
        assert.equal(foundSerials, '');
    });
});

describe('generateValidKey()', function () {
    it('should return almozlakee ', function () {
        const key = 'ammazzate';
        const validKey = superactivator.generateValidKey(key)
        assert.equal(validKey, 'almozlakee');
    });
    it('should return mltodlckie ', function () {
        const key = 'motedicoio';
        const validKey = superactivator.generateValidKey(key)
        assert.equal(validKey, 'mltodlckie');
    });
});

describe('generateValidKey()', function () {
    it('should return OK ', function () {
        const checkKey = 'almozlakee';
        const patKey = 'almozlakee';
        const validKey = superactivator.checkValidKey(checkKey, patKey)
        assert.equal(validKey, 'OK');
    });
    it('should return KO (different keys)', function () {
        const checkKey = 'almozlakee';
        const patKey = 'almozlake';
        const validKey = superactivator.checkValidKey(checkKey, patKey)
        assert.equal(validKey, 'KO');
    });
    it('should return KO (too short keys)', function () {
        const checkKey = 'almoz';
        const patKey = 'almoz';
        const validKey = superactivator.checkValidKey(checkKey, patKey)
        assert.equal(validKey, 'KO');
    });
});

describe('setKeyMismatched()', function () {
    it('key id 33 should return 1 ', async function () {
        const id = 33;
        const mismatch = await superactivator.setKeyMismatched(id)
        assert.equal(mismatch, '1');
    });
    it('key id 932 should return 1 ', async function () {
        const id = 932;
        const mismatch = await superactivator.setKeyMismatched(id)
        assert.equal(mismatch, '1');
    });
    it('key id undefined should return sql error ', async function () {
        const id = undefined;
        const mismatch = await superactivator.setKeyMismatched(id)
        assert.equal(mismatch, undefined);
    });
});

describe('decodeToMortal()', () => {
    it('should decode reqcode string 1', () => {
        const testStr = superactivator.decodeToMortal('c405f242c063c3032d04214088c383016792334098508201f8c73040f851c20193c03041c07043013c85704100410101be50714348a2420299daa3424cd042028a5ca341c0b143027bf4234180f10202ed6023417080c002')
        assert.equal(testStr, 'teststringa');
    });
    it('should decode reqcode string 2', () => {
        const testStr = superactivator.decodeToMortal('1086334168310002b526a1432c5001029b70f340e05300015cf6704258e342023752f34268a38301b4d6b240048200027ea3b04298818303052be04140f141036a3f214128734302db4462406cd081013532e04120e1c001')
        assert.equal(testStr, 'teststringa');
    });
    it('should decode reqcode string 3', () => {
        const testStr = superactivator.decodeToMortal('38863240180083004de66342bc5343015b73324350e20002d8c6f0430cf2c1000f2132400072c303b0167043e0f0010372a3b2432860820171c86241a4e28200165ca341c0e3c3018b54a2402003c202d1a0e041e4038300')
        assert.equal(testStr, 'teststringa');
    });
    it('should decode reqcode string 4', () => {
        const testStr = superactivator.decodeToMortal('6807b14270e2c102ad54a140f8e34003e3e17041e49041035ca63042941381023352b340e8b142022095b242acd20302fa403341f0730103a57ba04024e2c202ce3ce2404851c203d73663431ce10103bd012242e800c300')
        assert.equal(testStr, 'teststringa');
    });
    it('should decode reqcode string 5', () => {
        const testStr = superactivator.decodeToMortal('f894f340e0d2c10235b5604348b04101e7a3334144b3430168a6f1427060800317533042a8f24200dcb53242fc9142035e53b140a8124101556be1438c628003c6ade14360038202cb64e0432cf2c0036522e141aca30003')
        assert.equal(testStr, 'teststringa');
    });
})