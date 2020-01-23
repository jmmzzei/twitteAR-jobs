const percentEncode = require('./percentEncode')
const genSortedParamStr = require('./genSortedParamStr')

const oAuthBaseString = (method, url, params, key, token, timestamp, nonce) => {
    return method
        + '&' + percentEncode(url)
        + '&' + percentEncode(genSortedParamStr(params, key, token, timestamp, nonce));
};

module.exports = oAuthBaseString