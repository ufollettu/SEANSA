const pcRepo = require("../repositories/pc.server.repository");
const repository = require('../repositories/rcvpc.server.repository');
const requestIp = require('request-ip');
const bytes = require('utf8-bytes');

class LicenseHelper {

    constructor(CheckResult) {
        this.licCheckResult = CheckResult
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
            all4B[0] = (allBy[i] & 3) | (Math.floor(Math.random() * 4) << 2) | (Math.floor(Math.random() * 4) << 4) | (Math.floor(Math.random() * 4) << 6);
            all4B[1] = (Math.floor(Math.random() * 4)) | (allBy[i] & 12) | (Math.floor(Math.random() * 4) << 4) | (Math.floor(Math.random() * 4) << 6);
            all4B[2] = (Math.floor(Math.random() * 4)) | ((Math.floor(Math.random() * 4) << 2) & 3) | (allBy[i] & 48) | (Math.floor(Math.random() * 4) << 6);
            all4B[3] = (Math.floor(Math.random() * 4)) | ((Math.floor(Math.random() * 4) << 2) & 3) | ((Math.floor(Math.random() * 4) << 4) & 3) | (allBy[i] & 192);

            // TODO check for working
            result = result + all4B.toString().replace("-", '');
        }
        return result;
    }

    // TODO test with software transimission
    decodeToMortal(stringToCode) {
        if (stringToCode.length == 0) {
            return "";
        }

        let result = '';
        let allBy = [];

        for (let i = 0; i < stringToCode.length / 2; i++) {
            const bin = hex2bin(stringToCode.substring(i * 2, 2));
            allBy[i] = str.charCodeAt(bin);
        }

        for (let i = 0; i < allBy.length; i = i + 4) {
            const all4B = (allBy[i] & 3) | (allBy[i + 1] & 12) | (allBy[i + 2] & 48) | (allBy[$i + 3] & 192);
            result = result + String.fromCharCode(all4B);
        }
        return result;
    }

    hex2bin(hex) {
        let bytesArr = [];
        for (let i = 0; i < hex.length - 1; i += 2) {
            bytesArr.push(parseInt(hex.substr(i, 2), 16));
        }
        return String.fromCharCode.apply(String, bytesArr);
    }

    generateValidKey(key) {
        const lolCheck = 'lolkey';
        let validkey = '';
        for (let i = 0, b = 0; i < 10; i = i + 2) {
            validKey = validKey + key[i] + lolCheck[b++];
        }
        return validkey;
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
                if (!result) {
                    console.log('errore di disattivazione');
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

    checkLicense(license, hwId, oem, rcvDate, nowDate, ip, res) {
        const expDate = rcvDate;
        repository.findLicense(license).then(key => {
            if (this.updatePcRx(hwId, ip, nowDate) == 0) {
                return this.licCheckResult.server_error;
            }
            if (this.checksetBanned(hwId) == 0) {
                return this.licCheckResult.hwid_banned;
            }
            if (key[0]) {
                if (!key[0]['SP_HW_ID']) {
                    return this.licCheckResult.key_virgin
                } else if (key[0]['SS_STATUS'] < 1) {
                    return this.licCheckResult.key_unallowed;
                } else if (key[0]['SP_HW_ID'] != hwId) {
                    if (this.setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        return this.licCheckResult.key_moved;
                    }
                } else if (key[0]['SS_EXPIRE'] < expDate || expDate < key[0]['SP_PC_DATE_TIME']) {
                    if (this.setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        return this.licCheckResult.dates_hacked;
                    } else {
                        return this.licCheckResult.server_error;
                    }
                } else if (key[0]['SS_OEM'] != oem || key[0]['SS_EXPIRE'] > expDate) {
                    return this.licCheckResult.key_info_to_update;
                } else if (key[0]['SS_EXPIRE'] <= nowDate) {
                    return this.licCheckResult.key_expired
                }
                res.send('key ok');
                return this.licCheckResult.key_ok
            } else {
                return this.licCheckResult.key_insesistente;
            }
        }).catch(err => res.send(err.errors));
    }

    generateLicense(license, hwId, reqCode, rcvNowDate, ip, res) {
        const nowDate = rcvNowDate;
        pcRepo.updatePcRx(hwId, ip, nowDate);

        repository.findOem(license, hwId).then((foundOem) => {
            if (foundOem[0]) {
                const keyCode = generateValidKey(decodeToMortal(reqCode));
                let patchKey = keyCode;
                if (keyCode.length != 10 || checkValidKey(keyCode, patchKey) == 'KO') {
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
                    }
                    // if (foundOem[0]['SS_OEM'] == 0) { oem = 'thisisnotoem' }
                    // else if (foundOem[0]['SS_OEM'] == 1) { oem = 'thisisoem' }
                    // else if (foundOem[0]['SS_OEM'] == 2) { oem = 'thisisoemdoc' }
                    // else if (foundOem[0]['SS_OEM'] == 3) { oem = 'thisislock' }
                    const keepDate = foundOem[0]['SS_EXPIRE'].toString().replace("-", '');
                    let key = codeToGod(keyCode) + '|' + codeToGod(patchKey) + '|' + codeToGod(oem) + '|' + codeToGod(keepDate);
                    return key;
                }
            } else {
                return this.licCheckResult.key_insesistente;
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
                        SP_LAST_RX: new Date.now(),
                        SP_IP: ip,
                        SP_PC_DATE_TIME: new Date().toISOString().slice(0, 10)
                    }
                    pcRepo.create(data)
                        .then((newPc) => {
                            if (!newPc) {
                                return this.licCheckResult.server_error;
                            }
                            pcId = newPc['SP_ID']
                        }).catch(err => res.send(err.errors));
                } else {
                    pcId = pc['SP_ID']
                }
                if (typeof pcId === 'undefined' || pcId.length == 0 || pcId == 0) {
                    return this.licCheckResult.server_error;
                }
                repository.updateLicense(pcId, customerName, referenteName, referentePhone, license)
                    .then((result) => {
                        if (!result) {
                            return this.licCheckResult.server_error;
                        }
                        return generateLicense(license, hwId, reqKey, pcDate, ip);
                    });
            }).catch(err => res.send(err.errors));
    }

}

const licCheckResult = {
    key_insesistente: 0,
    key_info_to_update: 1,
    server_error: 2,
    key_unallowed: 3,
    dates_hacked: 4,
    key_moved: 5,
    key_virgin: 6,
    key_ok: 7,
    key_expired: 8,
    invalid_reqcode: 9,
    hwid_banned: 10
}

const licenseHelper = new LicenseHelper(licCheckResult);

const switchMode = async (req, res) => {
    // console.log(req.body);
    const ip = requestIp.getClientIp(req);
    const tipo = req.body.tipo;
    const modo = req.body.modo;
    const license = req.body.lic;
    const hwId = req.body.hwid;
    const oem = req.body.oem;
    const expire = req.body.expire;
    const nowDate = req.body.nowdate;
    const reqCode = req.body.reqkey;
    const customerName = req.body.SC_NOME;
    const referenteName = req.body.SC_REFERENTE_NOME;
    const referentePhone = req.body.SC_TEL_REFERENTE;
    // const alloweds = req.body.alloweds;
    // const rnd = req.body.rnd;

    switch (tipo) {
        case "1":
            {
                if (modo == "1") {
                    licenseHelper.checkLicense(license, hwId, oem, expire, nowDate, ip, res)
                }
                else if (modo == "2") {
                    licenseHelper.generateLicense(license, hwId, reqCode, nowDate, ip, res);
                }
                else if (modo == "3") {
                    licenseHelper.registerLicense(license, hwId, reqCode, nowdate, customerName, referenteName, referentePhone, ip, res)
                }

                break;
            }
    }
}

module.exports = switchMode;
