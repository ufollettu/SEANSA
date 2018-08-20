const pcRepo = require("../repositories/pc.server.repository");
const repository = require('../repositories/rcvpc.server.repository');
const requestIp = require('request-ip');
const bytes = require('utf8-bytes');

class LicenseHelper {
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
            .then((result) => {
                if (!result) {
                    console.log('errore di disattivazione');
                    return 0;
                }
                return 1;
            }).catch(err => console.log(err.message))
    }

    checkLicense(license, hwId, oem, rcvDate, nowDate, req) {
        const expDate = rcvDate.toISOString().slice(0, 10);
        const ip = requestIp.getClientIp(req); // set req somewhere
        repository.findLicense(license).then(key => {
            if (pcRepo.updatePcRx(hwId, ip, nowDate) == 0) {
                throw new Error('server error')
            }
            if (checksetBanned(hwId) == 0) {
                throw new Error('pc banned')
            }
            if (key[0]) {
                if (!key[0]['SP_HW_ID']) {
                    throw new Error('key virgin')
                } else if (key[0]['SS_STATUS'] < 1) {
                    throw new Error('key not allowed')
                } else if (key[0]['SP_HW_ID'] != hwId) {
                    if (setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        throw new Error('key moved')
                    }
                } else if (key[0]['SS_EXPIRE'] < expDate || key[0]['SS_EXPIRE'] < key[0]['SP_PC_DATE_TIME']) {
                    if (setKeyMismatched(key[0]['SS_ID'] == 1)) {
                        throw new Error('dates hacked')
                    } else {
                        throw new Error('server error')
                    }
                } else if (key[0]['SS_OEM'] != oem || key[0]['SS_EXPIRE'] > expDate) {
                    throw new Error('key info to update')
                } else if (key[0]['SS_EXPIRE'] <= expDate) {
                    throw new Error('key expired')
                }
                return 'key ok';
            } else {
                throw new Error('key not exists')
            }
        }).catch(err => console.log(err.message));
    }

    generateLicense(license, hwId, reqCode, rcvNowDate) {
        const ip = requestIp.getClientIp(req); // set req somewhere
        const nowDate = rcvNowDate.toISOString().slice(0, 10);
        pcRepo.updatePcRx(hwId, ip, nowDate);

        repository.findOem(license, hwId).then((foundOem) => {
            if (foundOem[0]) {
                const keyCode = generateValidKey(decodeToMortal(reqCode));
                let patchKey = keyCode;
                if (keyCode.length != 10 || checkValidKey(keyCode, patchKey) == 'KO') {
                    throw new Error('invalid req code');
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
                throw new Error('key not exists')
            }
        }).catch(err => console.log(err.message));
    }

    registerLicense(license, hwId, reqKey, pcDate, customerName, referenteName, referentePhone) {
        pcRepo.findOne(hwId)
            .then((pc) => {
                let pcId = '';
                if (!pc) {
                    const data = {
                        SP_HW_ID: hwId,
                        SP_LAST_RX: new Date.now(),
                        SP_IP: requestIp.getClientIp(req), // set req somewhere
                        SP_PC_DATE_TIME: new Date().toISOString().slice(0, 10)
                    }
                    pcRepo.create(data)
                        .then((newPc) => {
                            pcIp = newPc['SP_ID']
                        }).catch(err => res.send(err.errors));
                } else {
                    pcId = pc['SP_ID']
                }

                if (typeof pcIp === 'undefined' || pcIp.length == 0 || pcIp == 0) {
                    throw new Error('server error');
                }
                repository.updateLicense(pcId, customerName, referenteName, referentePhone, license)
                    .then((result) => {
                        if (!result) {
                            throw new Error('server error');
                        }
                        return generateLicense(license, hwId, reqKey, pcDate);
                    });
            }).catch(err => console.log(err.message));
    }

}

const licenseHelper = new LicenseHelper();

module.exports = licenseHelper;