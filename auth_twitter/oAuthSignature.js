const hmac_sha1 = require('./hmac_sha1')
const percentEncode = require('./percentEncode')

const oAuthSignature = (base_string, signing_key) => {
    var signature = hmac_sha1(base_string, signing_key);
    return percentEncode(signature);
};

module.exports = oAuthSignature