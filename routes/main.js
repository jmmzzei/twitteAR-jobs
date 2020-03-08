const express = require('express')
const router = express.Router()
const request = require('request')
const getAuthorization = require('../auth_twitter/getAuthorization')
const cardsGroupCreator = require('../helpers/cardsGroupCreator')

const notWantedKeywords = '-Soy%20-estoy%20'
const wantedKeywords = 'TrabajoAr%20Buscamos%20'
let QUERIES_AMOUNT = 100

router.get('/', (req, res) => {

  let { authorization, url } = getAuthorization({
    q: notWantedKeywords + wantedKeywords,
    count: QUERIES_AMOUNT,
    result_type: 'recent',
    tweet_mode: 'extended',
  })

  let config = {
    url,
    method: 'GET',
    headers: {
      Authorization: authorization,
    },
    force_login: true,
    json: true,
  }

  request(config, (err, resp, body) => {
    if (err) res.send('Something bad happened: ' + err)
    else {
      QUERIES_AMOUNT = body.statuses.length
      let bodyStatuses = body.statuses
      let cardsGroup = cardsGroupCreator(bodyStatuses, QUERIES_AMOUNT)
      res.render('index', { cardsGroup })
    }
  })



})

router.get('/search', (req, res) => {
    
    let countriesEncoded = percentEncode(req.query.country)
    let hashtagsEncoded = percentEncode(req.query.hashtags)
    let keywordsEncoded = percentEncode(req.query.keywords)

    let { authorization, url } = getAuthorization({
        q: notWantedKeywords + wantedKeywords,
        count: QUERIES_AMOUNT,
        result_type: 'recent',
        tweet_mode: 'extended',
      })
    
      let config = {
        url,
        method: 'GET',
        headers: {
          Authorization: authorization,
        },
        force_login: true,
        json: true,
      }
    
      request(config, (err, resp, body) => {
        if (err) res.send('Something bad happened: ' + err)
        else {
          QUERIES_AMOUNT = body.statuses.length
          let bodyStatuses = body.statuses
          let cardsGroup = cardsGroupCreator(bodyStatuses, QUERIES_AMOUNT)
          res.render('index', { cardsGroup })
        }
      })

})

module.exports = router


