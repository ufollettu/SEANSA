const pcRepo = require("../repositories/pc.server.repository");
const repository = require('../repositories/rcvpc.server.repository');
const bytes = require('utf8-bytes');
const hex2bin = require('locutus/php/strings/hex2bin');
const bin2hex = require('locutus/php/strings/bin2hex');
const ord = require('locutus/php/strings/ord');
const chr = require('locutus/php/strings/chr');
const substr = require('locutus/php/strings/substr');
const str_replace = require('locutus/php/strings/str_replace');
const rand = require('locutus/php/math/rand');

class LicenseHelper {

    constructor(CheckResult) {
        this.licCheckResult = CheckResult
    }

    decodeToMortal(stringToCode) {
        if (stringToCode.length == 0) {
            return "";
        }

        let result = '';
        let allBy = [];

        for (let i = 0; i < stringToCode.length / 2; i++) {
            const bin = hex2bin(substr(stringToCode, i * 2, 2));
            allBy[i] = ord(bin);
        }

        for (let i = 0; i < allBy.length; i = i + 4) {
            const all4B = (allBy[i] & 3) | (allBy[i + 1] & 12) | (allBy[i + 2] & 48) | (allBy[i + 3] & 192);
            result = result + chr(all4B);
        }
        return result;
    }

    // TODO test with software transimission
    codeToGod(stringToCode) {
        if (stringToCode.length == 0) {
            return "";
        }
        const allBy = bytes(stringToCode);
        let all4B = [];
        let result = '';

        for (let i = 1; i <= allBy.length; i++) {
            all4B[0] = (allBy[i] & 3) | (rand(0, 3) << 2) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
            all4B[1] = (rand(0, 3)) | (allBy[i] & 12) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
            all4B[2] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | (allBy[i] & 48) | (rand(0, 3) << 6);
            all4B[3] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | ((rand(0, 3) << 4) & 3) | (allBy[i] & 192);

            // TODO check for working
            const arrAll4B = all4B.map(chr(all4B)).join();
            console.log(arrAll4B);
            result = result + str_replace('-', '', bin2hex(arrAll4B));
            // result = result + all4B.toString().replace("-", '');
        }
        return result;
    }

    getAllowedSerials(keyId) {
        repository.findAllowedSerials(keyId).then(serials => {
            console.log(serials);
            if (serials) {
                return serials[0]['ALLOWEDS'];
            }
            return '';
        })
    }

    generateValidKey(key) {
        const lolCheck = 'lolkey';
        let validKey = '';
        for (let i = 0, b = 0; i < 10; i = i + 2) {
            validKey = validKey + key[i] + lolCheck[b++];
        }
        return validKey;
    }

    checkValidKey(checkKey, patKey) {
        const lolCheck = 'lolkey';
        for (let i = 0, b = 0; i < 9; i = i + 2) {
            if (checkKey[i] != patKey[i] || patKey[i + 1] != lolCheck[b++]) {
                return 'KO';
            }
        }
        return 'OK';
    }

    checksetBanned(hwId) {
        pcRepo.findOne(hwId)
            .then((pc) => {
                if (!pc) {
                    return 0;
                }
                return 1
            }).catch(err => console.log(err.message));
    }

    setKeyMismatched(id) {
        repository.updateMismatchCount(id)
            .spread((results, metadata) => {
                if (!results) {
                    console.log('errore di disattivazione key');
                    return 0;
                }
                return 1;
            }).catch(err => console.log(err.message))
    }

    updatePcRx(hwId, ip, nowDate) {
        pcRepo.updatePcRx(hwId, ip, nowDate)
            .spread((results, metadata) => {
                if (!results) {
                    return 0;
                }
                return 1
            }).catch(err => console.log(err.message));
    }

    checkLicense(license, hwId, oem, expDate, nowDate, ip, allowedSerials, res) {
        repository.findLicense(license).then(key => {
            console.log(key[0]);
            if (this.updatePcRx(hwId, ip, nowDate) == 0) {
                res.send(this.licCheckResult.server_error);
            }
            if (this.checksetBanned(hwId) == 0) {
                res.send(this.licCheckResult.hwid_banned);
            }
            if (key[0]) {
                if (!key[0]['SS_ALLOWED_SERIALS']) {
                    key[0]['SS_ALLOWED_SERIALS'] = "";
                }
                if (!key[0]['SP_HW_ID']) {
                    res.send(this.licCheckResult.key_virgin);
                } else if (key[0]['SS_STATUS'] < 1) {
                    res.send(this.licCheckResult.key_unallowed);
                } else if (key[0]['SP_HW_ID'] != hwId) {
                    if (this.setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        res.send(this.licCheckResult.key_moved);
                    }
                } else if (key[0]['SS_EXPIRE'] < expDate || nowDate < key[0]['SP_PC_DATE_TIME']) {
                    if (this.setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        res.send(this.licCheckResult.dates_hacked);
                    } else {
                        res.send(this.licCheckResult.server_error);
                    }
                } else if (
                    key[0]['SS_OEM'] != oem
                    || key[0]['SS_EXPIRE'] > expDate
                    || (key[0]['SS_ALLOWED_SERIALS']).localeCompare(this.decodeToMortal(allowedSerials)) != 0
                ) {
                    res.send(this.licCheckResult.key_info_to_update);
                } else if (key[0]['SS_EXPIRE'] <= nowDate) {
                    res.send(this.licCheckResult.key_expired);
                }
                res.send(this.licCheckResult.key_ok);
                // return this.licCheckResult.key_ok
            } else {
                res.send(this.licCheckResult.key_insesistente);
            }
        }).catch(err => res.send(err.errors));
    }

    generateLicense(license, hwId, reqCode, nowDate, ip, res) {
        pcRepo.updatePcRx(hwId, ip, nowDate);

        repository.findOem(license, hwId)
            .then((foundOem) => {
                if (foundOem[0]) {
                    const keyCode = this.generateValidKey(this.decodeToMortal(reqCode));
                    let patchKey = keyCode;
                    if (keyCode.length != 10 || this.checkValidKey(keyCode, patchKey) == 'KO') {
                        res.send(this.licCheckResult.invalid_reqcode);
                    } else {
                        let oem = '';
                        switch (foundOem[0]['SS_OEM']) {
                            case 0:
                                oem = 'thisisnotoem'
                                break;
                            case 1:
                                oem = 'thisisoem'
                                break;
                            case 2:
                                oem = 'thisisoemdoc'
                                break;
                            case 3:
                                oem = 'thisislock'
                                break;
                            case 10:
                                oem = 'thisisnotoem_lecu'
                                break;
                            case 11:
                                oem = 'thisisdemo_lecu'
                                break;
                            case 12:
                                oem = 'thisisoem_lecu'
                                break;
                        }
                        // if (foundOem[0]['SS_OEM'] == 0) { oem = 'thisisnotoem' }
                        // else if (foundOem[0]['SS_OEM'] == 1) { oem = 'thisisoem' }
                        // else if (foundOem[0]['SS_OEM'] == 2) { oem = 'thisisoemdoc' }
                        // else if (foundOem[0]['SS_OEM'] == 3) { oem = 'thisislock' }
                        // else if (foundOem[0]['SS_OEM'] == 10) { oem = 'thisisnotoem_lecu' }
                        // else if (foundOem[0]['SS_OEM'] == 11) { oem = 'thisisdemo_lecu' }
                        // else if (foundOem[0]['SS_OEM'] == 12) { oem = 'thisisoem_lecu' }

                        const keepDate = str_replace('-', "", foundOem[0]['SS_EXPIRE'])
                        const allowedSerials = this.getAllowedSerials(foundOem[0]['SS_ID'])
                        let key =
                            this.codeToGod(keyCode) + '|'
                            + this.codeToGod(patchKey) + '|'
                            + this.codeToGod(oem) + '|'
                            + this.codeToGod(keepDate) + '|'
                            + this.codeToGod(allowedSerials);
                        res.send(key);
                        // return key;
                    }
                } else {
                    res.send(this.licCheckResult.key_insesistente);
                }
            }).catch(err => res.send(err.errors));
    }

    registerLicense(license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip, res) {
        pcRepo.findOne(hwId)
            .then((pc) => {
                let pcId = '';
                if (!pc) {
                    const data = {
                        SP_HW_ID: hwId,
                        SP_LAST_RX: Date.now(),
                        SP_IP: ip,
                        SP_PC_DATE_TIME: new Date().toISOString().slice(0, 10)
                    }
                    pcRepo.create(data)
                        .then((newPc) => {
                            if (!newPc) {
                                res.send(this.licCheckResult.server_error);
                            }
                            pcId = newPc['SP_ID']
                            if (typeof pcId === 'undefined' || pcId.length == 0 || pcId == 0) {
                                res.send(this.licCheckResult.server_error);
                            }

                            repository.updateLicense(pcId, customerName, referenteName, referentePhone, license)
                                .spread((results, metadata) => {
                                    if (!results) {
                                        res.send(this.licCheckResult.server_error);
                                    }
                                    return this.generateLicense(license, hwId, reqKey, pcDate, ip, res);
                                }).catch(err => res.send(err.errors))
                            // return this.generateLicense(license, hwId, reqKey, pcDate, ip);

                        }).catch(err => res.send(err.errors));
                } else {
                    pcId = pc['SP_ID']
                    if (typeof pcId === 'undefined' || pcId.length == 0 || pcId == 0) {
                        res.send(this.licCheckResult.server_error);
                    }

                    repository.updateLicense(pcId, customerName, referenteName, referentePhone, license)
                        .spread((results, metadata) => {
                            if (!results) {
                                res.send(this.licCheckResult.server_error);
                            }
                            return this.generateLicense(license, hwId, reqKey, pcDate, ip, res);
                        }).catch(err => res.send(err.errors));
                    // return this.generateLicense(license, hwId, reqKey, pcDate, ip);
                }
            }).catch(err => res.send(err.errors));
    }

}

const licCheckResult = {
    key_insesistente: '0',
    key_info_to_update: '1',
    server_error: '2',
    key_unallowed: '3',
    dates_hacked: '4',
    key_moved: '5',
    key_virgin: '6',
    key_ok: '7',
    key_expired: '8',
    invalid_reqcode: '9',
    hwid_banned: '10'
}

const licenseHelper = new LicenseHelper(licCheckResult);

module.exports = licenseHelper;
