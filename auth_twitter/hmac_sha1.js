const jsSHA = require('jssha')

module.exports = hmac_sha1 = (string, secret) => {
  let shaObj = new jsSHA('SHA-1', 'TEXT')
  shaObj.setHMACKey(secret, 'TEXT')
  shaObj.update(string)
  return shaObj.getHMAC('B64')
}
