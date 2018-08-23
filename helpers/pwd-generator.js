function randomPassword(len) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let pass = [];
    const alphaLength = alphabet.length - 1;
    for (let i = 0; i < len; i++) {
        let n = Math.floor((Math.random() * alphaLength) + 0);
        pass.push(alphabet[n]);
    }
    return pass.join("");
}

module.exports = randomPassword;