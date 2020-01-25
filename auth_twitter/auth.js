const oAuthBaseString = require('./oAuhtBaseString')
const oAuthSigningKey =require('./oAuthSigningKey')
const oAuthSignature = require('./oAuthSignature')

const getAuthorization = reqParams => {
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

    let baseString = oAuthBaseString(reqParams, consumerKey, accessToken, timestamp, nonce);

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

module.exports = getAuthorization