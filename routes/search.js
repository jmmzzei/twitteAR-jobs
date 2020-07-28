const express = require('express')
const router = express.Router()
const request = require('request')
const getAuthorization = require('../auth_twitter/getAuthorization')
const cardsGroupCreator = require('../helpers/cardsGroupCreator')

let unwantedWord = ''
let wantedKeywords = ''
let hashtags = ''
let QUERIES_AMOUNT = 300
let cardsGroup = ''

router.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.get('/', (req, res) => {
  unwantedWord = req.query.unwanted ? req.query.unwanted + '%20' : unwantedWord
  wantedKeywords = req.query.keywords ? req.query.keywords : wantedKeywords
  hashtags = req.query.hashtags ? req.query.hashtags : hashtags

  let { authorization, url } = getAuthorization({
    q: unwantedWord + wantedKeywords + hashtags,
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
      cardsGroup = cardsGroupCreator(bodyStatuses, QUERIES_AMOUNT)
      res.render('index', { cardsGroup })
    }
  })
})

module.exports = router
