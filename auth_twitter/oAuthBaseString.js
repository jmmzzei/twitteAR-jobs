const percentEncode = require('./percentEncode')
const genSortedParamStr = require('./genSortedParamStr')

module.exports = oAuthBaseString = (params, authBaseParams) => {
    let paramObj = {...authBaseParams, ...params}
    let url = 'https://api.twitter.com/1.1/search/tweets.json'

    return { baseString:  'GET'
        + '&' + percentEncode(url)
        + '&' + percentEncode(genSortedParamStr(paramObj)),
    url: url + '?' + genSortedParamStr(params)}
};

 