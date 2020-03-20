const percentEncode = require('./percentEncode')

module.exports = genSortedParamStr = paramObj => {
  let paramStr = ''
  for (const key in paramObj) {
    if (key !== 'count')
      paramStr +=
        '&' + key + '=' + percentEncode(decodeURIComponent(paramObj[key]))
  }
  return `count=${paramObj.count + paramStr}`
}
