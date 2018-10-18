const pcRepo = require("../repositories/pc.server.repository");
const repository = require('../repositories/rcvpc.server.repository');
const packRepo = require('../repositories/pacchetti.server.repository');
const packHistoryRepo = require('../repositories/pacchetti-history.server.repository');
const bytes = require('utf8-bytes');
const hex2bin = require('locutus/php/strings/hex2bin');
const bin2hex = require('locutus/php/strings/bin2hex');
const ord = require('locutus/php/strings/ord');
const chr = require('locutus/php/strings/chr');
const substr = require('locutus/php/strings/substr');
const str_replace = require('locutus/php/strings/str_replace');
const rand = require('locutus/php/math/rand');
const strcmp = require('locutus/php/strings/strcmp');
const strtotime = require('locutus/php/datetime/strtotime');
const time = require('locutus/php/datetime/time');
const isset = require('locutus/php/var/isset');
const is_null = require('locutus/php/var/is_null');

class SuperActivator {

    constructor(CheckResult) {
        this.licCheckResult = CheckResult;
    }

    decodeToMortal(stringToCode) {
        if (is_null(stringToCode) || stringToCode.length == 0) {
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

    unpack(str) {
        let bytes = [];
        for (let i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i));
        }
        return bytes;
    }

    codeToGod(stringToCode) {
        if (!stringToCode || stringToCode.length == 0) {
            return "";
        }
        const allBy = this.unpack(stringToCode);
        // const allBy = bytes(stringToCode);
        let all4B = [];
        let result = '';

        for (let i = 0; i < allBy.length; i++) {
            all4B[0] = (allBy[i] & 3) | (rand(0, 3) << 2) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
            all4B[1] = (rand(0, 3)) | (allBy[i] & 12) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
            all4B[2] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | (allBy[i] & 48) | (rand(0, 3) << 6);
            all4B[3] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | ((rand(0, 3) << 4) & 3) | (allBy[i] & 192);

            const arrAll4B = all4B.map((el) => {
                return chr(el);
            }).join('');
            // console.log(arrAll4B);
            result = result + str_replace('-', '', bin2hex(arrAll4B));
        }
        return result;
    }

    getAllowedSerials(keyId) {
        return repository.findAllowedSerials(keyId)
            .then(serials => {
                if (serials[0]['ALLOWEDS'] !== null) {
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
        return pcRepo.findOne(hwId)
            .then((pc) => {
                if (!pc) {
                    // console.log('errore di check pc');
                    return 0;
                }
                return 1
            }).catch(err => console.log(err.message));
    }

    checkPack(licenseId) {
        return packHistoryRepo.findByLicense(licenseId)
            .then((historyRow) => {
                if (!historyRow) {
                    return 0;
                }
                return historyRow['SPKH_SPK_ID'];
            }).catch(err => console.log(err.message))
    }

    setKeyMismatched(id) {
        return repository.updateMismatchCount(id)
            .spread((results, metadata) => {
                // console.log(results.affectedRows);
                if (!results) {
                    // console.log('errore di disattivazione key');
                    return 0;
                } else if (results.affectedRows == 0) {
                    // console.log('key id non esistente');
                    return 0;
                }
                return 1;
            }).catch(err => console.log(err.message))
    }

    updatePcRx(hwId, ip, nowDate) {
        return pcRepo.updatePcRx(hwId, ip, nowDate)
            .spread((results, metadata) => {
                if (!results) {
                    console.log('errore di update pc_rx');
                    return 0;
                }
                return 1
            }).catch(err => console.log(err.message));
    }

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

    async checkLicense(license, hwId, oem, expDate, nowDate, ip, allowedSerials) {
        return repository.findLicense(license).then(async key => {
            if (key[0]) {
                const packId = await this.checkPack(key[0]['SS_ID']);
                if (packId == 0) {
                    // license not in pack, continue with classic checks
                    return await this.classicCheck(license, hwId, oem, expDate, nowDate, ip, allowedSerials);
                } else {
                    // license in pack, get pack by license
                    return packRepo.findById(packId)
                        .then(async pack => {
                            // test if pack is expired
                            if (strtotime(pack['SPK_EXPIRE']) <= strtotime(nowDate)) {
                                // if expired return message key_expired: '8',
                                return this.licCheckResult.key_expired;
                            } else {
                                // if not expired, continue with classic search
                                return await this.classicCheck(license, hwId, oem, expDate, nowDate, ip, allowedSerials);
                            }
                        })
                        .catch(err => this.licCheckResult.server_error)
                }
            } else {
                return this.licCheckResult.key_insesistente;
            }
        }).catch(err => this.licCheckResult.server_error);
    }

    async classicCheck(license, hwId, oem, expDate, nowDate, ip, allowedSerials) {
        return repository.findLicense(license).then(async key => {

            if (!isset(key[0]['SS_ALLOWED_SERIALS']) || is_null(key[0]['SS_ALLOWED_SERIALS'])) {
                key[0]['SS_ALLOWED_SERIALS'] = "";
            }
            const updatePc = await this.updatePcRx(hwId, ip, nowDate);
            if (updatePc == 0) {
                return this.licCheckResult.server_error;
            }
            if (this.checksetBanned(hwId) == 0) {
                return this.licCheckResult.hwid_banned;
            }
            if (!isset(key[0]['SP_HW_ID'])) {
                return this.licCheckResult.key_virgin;
            }
            if (key[0]['SS_STATUS'] < 1) {
                return this.licCheckResult.key_unallowed;
            }
            if (key[0]['SP_HW_ID'] != hwId) {
                const updateMismatch = await this.setKeyMismatched(key[0]['SS_ID']);
                if (updateMismatch == 1) {
                    return this.licCheckResult.key_moved;
                }
            }
            if ((strtotime(key[0]['SS_EXPIRE']) < strtotime(expDate))
                || (strtotime(nowDate) < strtotime(key[0]['SP_PC_DATE_TIME']))
                || (strtotime(nowDate) < time() - 60 * 60 * 24 * 2)
            ) {
                const updateMismatch = await this.setKeyMismatched(key[0]['SS_ID']);
                if (updateMismatch == 1) {
                    return this.licCheckResult.dates_hacked;
                } else {
                    return this.licCheckResult.server_error;
                }
            }
            if ((key[0]['SS_OEM'] != oem)
                || (strtotime(key[0]['SS_EXPIRE']) > strtotime(expDate)
                    || strcmp(key[0]['SS_ALLOWED_SERIALS'], this.decodeToMortal(allowedSerials)) != 0)
            ) {
                return this.licCheckResult.key_info_to_update;
            }
            if (strtotime(key[0]['SS_EXPIRE']) <= strtotime(nowDate)) {
                return this.licCheckResult.key_expired;
            }
            return this.licCheckResult.key_ok;
        }).catch(err => this.licCheckResult.server_error);
    }

    generateLicense(license, hwId, reqCode, nowDate, ip) {
        pcRepo.updatePcRx(hwId, ip, nowDate);

        return repository.findOem(license, hwId)
            .then(async (foundOem) => {
                if (foundOem[0]) {
                    const keyCode = this.generateValidKey(this.decodeToMortal(reqCode));
                    let patchKey = keyCode;
                    if (keyCode.length != 10 || this.checkValidKey(keyCode, patchKey) == 'KO') {
                        return this.licCheckResult.invalid_reqcode;
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
                        const keepDate = str_replace('-', "", foundOem[0]['SS_EXPIRE'])
                        const allowedSerials = await this.getAllowedSerials(foundOem[0]['SS_ID'])
                        const key =
                            this.codeToGod(keyCode) + '|'
                            + this.codeToGod(patchKey) + '|'
                            + this.codeToGod(oem) + '|'
                            + this.codeToGod(keepDate) + '|'
                            + this.codeToGod(allowedSerials);
                        return key;
                    }
                } else {
                    return this.licCheckResult.key_insesistente;
                }
            }).catch(err => this.licCheckResult.server_error);
    }

    registerLicense(license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone, ip) {
        return pcRepo.findOne(hwId)
            .then(async (pc) => {
                let pcId = '';
                if (!pc) {
                    const data = {
                        SP_HW_ID: hwId,
                        SP_LAST_RX: Date.now(),
                        SP_IP: ip,
                        SP_PC_DATE_TIME: new Date().toISOString().slice(0, 10)
                    }
                    pcId = await pcRepo.create(data)
                        .then((newPc) => {
                            if (!newPc) {
                                return this.licCheckResult.server_error;
                            }
                            return newPc['SP_ID']
                        }).catch(err => this.licCheckResult.server_error);
                } else {
                    pcId = pc['SP_ID'];
                }
                // console.log(pcId);
                if (!isset(pcId) || pcId.length == 0 || pcId == 0) {
                    return this.licCheckResult.server_error;
                }
                return repository.updateLicense(pcId, customerName, referenteName, referentePhone, license)
                    .spread((results, metadata) => {
                        if (!results) {
                            return this.licCheckResult.server_error;
                        }
                        return this.generateLicense(license, hwId, reqKey, pcDate, ip);
                    }).catch(err => this.licCheckResult.server_error);
            }).catch(err => this.licCheckResult.server_error);
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

const superActivator = new SuperActivator(licCheckResult);

module.exports = superActivator;
