const jwt = require("jsonwebtoken");
const users_permissions_repo = require("../repositories/utenti-permessi.server.repository");
const user_repo = require("../repositories/utenti.server.repository");

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

function codeToGod(stringToCode) {
    // if (strlen($StringToCode) == 0) {
    //     return "";
    // }

    // $AllBy = unpack('C*', $StringToCode);
    // $StringToCode = "";

    // for ($i = 1; $i <= count($AllBy); $i++) {
    //     $All4B[0] = ($AllBy[$i] & 3) | (rand(0, 3) << 2) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
    //     $All4B[1] = (rand(0, 3)) | ($AllBy[$i] & 12) | (rand(0, 3) << 4) | (rand(0, 3) << 6);
    //     $All4B[2] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | ($AllBy[$i] & 48) | (rand(0, 3) << 6);
    //     $All4B[3] = (rand(0, 3)) | ((rand(0, 3) << 2) & 3) | ((rand(0, 3) << 4) & 3) | ($AllBy[$i] & 192);


    //     $StringToCode = $StringToCode.str_replace('-', '', bin2hex(join(array_map("chr", $All4B))));
    // }
    // return $StringToCode;
}

function decodeToMortal(stringToCode) {
    // if (strlen($StringToCode) == 0) {
    //     return "";
    // }    

    // for($i=0; $i< strlen($StringToCode)/2; $i++){
    //     $bin = hex2bin(substr($StringToCode, $i * 2, 2));
    //     $AllBy[$i] = ord($bin);
    // }

    // $StringToCode = "";

    // for ($i=0; $i< count($AllBy); $i=$i+4) {
    //     $All4B = ($AllBy[$i] & 3) | ($AllBy[$i + 1] & 12) | ($AllBy[$i + 2] & 48) | ($AllBy[$i + 3] & 192);
    //     $StringToCode = $StringToCode . chr($All4B);
    // }
    // return $StringToCode;
}

module.exports = {
    verifyToken,
    can,
    allow,
    disallow,
    codeToGod,
    decodeToMortal
};

// TODO add guard to prevent unauthorized uses to non SU users
