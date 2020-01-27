const express = require('express')
const router = express.Router()
const request = require('request')
const getAuthorization = require('../auth_twitter/auth')
const cardsGroupCreator = require('../helpers/cardsGroupCreator')

const queries = 'TrabajoAr'
let QUERIES_AMOUNT = 50

router.get('/', (req, res) => {
    let authorization = getAuthorization({ 'q': queries, 'count': QUERIES_AMOUNT, 'result_type': 'recent', 'tweet_mode': 'extended' });

    let config = {
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${queries}&count=${QUERIES_AMOUNT}&result_type=recent&tweet_mode=extended`,
        method: 'GET',
        headers: {
            'Authorization': authorization
        },
        force_login: true,
        json: true
    }
    request(config, (err, resp, body) => {
        QUERIES_AMOUNT = body.statuses.length
        let bodyStatuses = body.statuses
        let cardsGroup = cardsGroupCreator(bodyStatuses, QUERIES_AMOUNT)
        res.render('index', { cardsGroup })
    })
});

module.exports = router;
