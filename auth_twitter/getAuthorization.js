const oAuthBaseString = require('./oAuthBaseString')
const oAuthSignature = require('./oAuthSignature')

module.exports = (reqParams) => {
  const consumerKey = process.env.TWITTER_CONSUMER_KEY,
    accessToken = process.env.TWITTER_ACCESS_TOKEN,
    consumerSecret = process.env.TWITTER_CONSUMER_SECRET,
    accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

  let timestamp = Math.round(Date.now() / 1000)
  let nonce = Buffer.from(consumerKey + ':' + timestamp).toString('base64')

  const authBaseParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: accessToken,
    oauth_version: '1.0',
  }

  let { baseString, url } = oAuthBaseString(reqParams, authBaseParams)
  let signingKey = consumerSecret + '&' + accessTokenSecret
  let signature = oAuthSignature(baseString, signingKey)

  return {
    authorization:
      'OAuth ' +
      'oauth_consumer_key="' +
      consumerKey +
      '", ' +
      'oauth_nonce="' +
      nonce +
      '", ' +
      'oauth_signature="' +
      signature +
      '", ' +
      'oauth_signature_method="HMAC-SHA1", ' +
      'oauth_timestamp="' +
      timestamp +
      '", ' +
      'oauth_token="' +
      accessToken +
      '", ' +
      'oauth_version="1.0"',
    url,
  }
}
