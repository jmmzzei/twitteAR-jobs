const hmac_sha1 = require('./hmac_sha1')
const percentEncode = require('./percentEncode')

module.exports = oAuthSignature = (base_string, signing_key) =>
    percentEncode(hmac_sha1(base_string, signing_key))