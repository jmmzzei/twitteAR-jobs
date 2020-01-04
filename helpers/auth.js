const jsSHA = require('jssha')
const auth = {}

auth.getAuthorization = (httpMethod, baseUrl, reqParams) => {
    // Get acces keys
    const consumerKey = process.env.TWITTER_CONSUMER_KEY,
        consumerSecret = process.env.TWITTER_CONSUMER_SECRET,
        accessToken = process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;       
    // timestamp as unix epoch
    let timestamp = Math.round(Date.now() / 1000);
    // nonce as base64 encoded unique random string
    let nonce = Buffer.from(consumerKey + ':' + timestamp).toString('base64');
    // generate signature from base string & signing key

    let baseString = oAuthBaseString(httpMethod, baseUrl, reqParams, consumerKey, accessToken, timestamp, nonce);

    let signingKey = oAuthSigningKey(consumerSecret, accessTokenSecret);
    let signature = oAuthSignature(baseString, signingKey);
    // return interpolated string
    return 'OAuth ' +
        'oauth_consumer_key="' + consumerKey + '", ' +
        'oauth_nonce="' + nonce + '", ' +
        'oauth_signature="' + signature + '", ' +
        'oauth_signature_method="HMAC-SHA1", ' +
        'oauth_timestamp="' + timestamp + '", ' +
        'oauth_token="' + accessToken + '", ' +
        'oauth_version="1.0"';
}

const oAuthBaseString = (method, url, params, key, token, timestamp, nonce) => {
    return method
        + '&' + percentEncode(url)
        + '&' + percentEncode(genSortedParamStr(params, key, token, timestamp, nonce));
};

const oAuthSigningKey = (consumer_secret, token_secret) => {
    return consumer_secret + '&' + token_secret;
};

const oAuthSignature = (base_string, signing_key) => {
    var signature = hmac_sha1(base_string, signing_key);
    return percentEncode(signature);
};

const percentEncode = str => {
    return encodeURIComponent(str).replace(/[!*()']/g, (character) => {
        return '%' + character.charCodeAt(0).toString(16);
    });
};

const hmac_sha1 = (string, secret) => {
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(secret, "TEXT");
    shaObj.update(string);
    let hmac = shaObj.getHMAC("B64");
    return hmac;
};

const mergeObjs = (obj1, obj2) => {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
    return obj1;
};

const genSortedParamStr = (params, key, token, timestamp, nonce) => {
    // Merge oauth params & request params to single object
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
    );
    // Sort alphabetically
    let paramObjKeys = Object.keys(paramObj);
    let len = paramObjKeys.length;
    paramObjKeys.sort();
    // Interpolate to string with format as key1=val1&key2=val2&...
    let paramStr = paramObjKeys[0] + '=' + paramObj[paramObjKeys[0]];
    for (var i = 1; i < len; i++) {
        paramStr += '&' + paramObjKeys[i] + '=' + percentEncode(decodeURIComponent(paramObj[paramObjKeys[i]]));
    }
    return paramStr;
};

module.exports = auth;