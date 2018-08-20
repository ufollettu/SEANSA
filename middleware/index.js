const jwt = require("jsonwebtoken");
const users_permissions_repo = require("../repositories/utenti-permessi.server.repository");
const user_repo = require("../repositories/utenti.server.repository");
var bytes = require('utf8-bytes');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('no header request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        console.log('null');
        return res.status(401).send('null token request');
    }
    const jwtPayload = jwt.verify(token, CONFIG.jwt_encryption);
    if (!jwtPayload) {
        return res.status(401).send('token not match request');
    }
    req.userId = jwtPayload.userId;
    req.permString = jwtPayload.permString;

    console.log(`User id from jwt: ${jwtPayload.userId}`);
    console.log(`Permission string from jwt: ${jwtPayload.permString}`);

    next();
}

function can(permissionId, userId) {
    return (req, res, next) => {
        userId = req.userId || userId;
        console.log(`permission Id: ${permissionId}`);
        console.log(`user Id: ${userId}`);

        // call the db: here we using a repo with sequelize ORM
        users_permissions_repo.findOne(userId, permissionId).then(res => {
            if (!res) {
                throw new Error('non hai il permesso per utilizzare questa risorsa');
            } else if (res) {
                next();
            }
        }).catch(err => {
            res.status(401).send(err.message);
        });
    };
}

function allow(permissionId, userId) {
    return (req, res, next) => {
        const data = req.body || { UP_U_ID: userId, UP_P_ID: permissionId } || {};
        // call the db: here we using a repo with sequelize ORM
        user_repo.findById(userId).then(utente => {
            // create a new permission association
            users_permissions_repo.create(data).then(result => {
                // res.json(result);
                next();
            }).catch(err => res.send(err.errors));
        });
    };
}

function disallow(permissionId, userId) {
    return (req, res, next) => {
        const data = req.body || { UP_U_ID: userId, UP_P_ID: permissionId } || {};
        // call the db: here we using a repo with sequelize ORM
        user_repo.findById(userId).then(utente => {
            // delete a founded permission association
            users_permissions_repo.destroy(data).then(affectedRows => {
                // console.log(result); // no result!
                // res.status(200).send(`destroyed ${affectedRows} rows` );
                next();
            }).catch(err => res.send(err.errors));
        });
    };
}

// TODO test with software transimission
function codeToGod(stringToCode) {
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
function decodeToMortal(stringToCode) {
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

function hex2bin(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length - 1; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return String.fromCharCode.apply(String, bytes);
}

function generateValidKey(key) {
    // $lolcheck = 'lolkey';
    // for($i=0; $i<10 ; $i=$i+2) {
    //     $validKey = $validKey . $key[$i] . $lolcheck[$b++];
    // }
    // return $validKey;
}

function checkValidKey(checkkey, patkey) {
    // $lolcheck = 'lolkey';
    // for($i=0; $i<9 ; $i=$i+2) {
    //     if($checkkey[$i] != $patkey[$i] || $patkey[$i+1] != $lolcheck[$b++]) {
    //         return 'KO';
    //     }
    // }
    // return 'OK';
}

module.exports = {
    verifyToken,
    can,
    allow,
    disallow,
    codeToGod,
    decodeToMortal,
    generateValidKey,
    checkValidKey
};

// TODO add guard to prevent unauthorized uses to non SU users
