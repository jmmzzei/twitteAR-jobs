const percentEncode = require('./percentEncode')
const genSortedParamStr = require('./genSortedParamStr')
const mergeObjs = require('./mergeObjects')

const oAuthBaseString = (params, key, token, timestamp, nonce) => {
    let paramObj = mergeObjs(
        {
            oauth_consumer_key: key,
            oauth_nonce: nonce,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: timestamp,
            oauth_token: token,
            oauth_version: '1.0'
        },
        params
    )
    let url= 'https://api.twitter.com/1.1/search/tweets.json'
    let sortedParams = genSortedParamStr(params)

    return { baseString:  'GET'
        + '&' + percentEncode(url)
        + '&' + percentEncode(genSortedParamStr(paramObj)),
    url: url + '?' + sortedParams}
};

module.exports = oAuthBaseString