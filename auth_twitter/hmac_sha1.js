const jsSHA = require('jssha')

const hmac_sha1 = (string, secret) => {
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(secret, "TEXT");
    shaObj.update(string);
    let hmac = shaObj.getHMAC("B64");
    return hmac;
};

module.exports = hmac_sha1
