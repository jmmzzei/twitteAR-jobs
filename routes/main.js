const express = require('express')
const router = express.Router()
const request = require('request')
const getAuthorization = require('../auth_twitter/auth')
const cardsGroupCreator = require('../helpers/cardsGroupCreator')

const notWantedKeywords = '-Soy%20-estoy%20'
const wantedKeywords = 'TrabajoAr%20Buscamos%20'
let QUERIES_AMOUNT = 100

router.get('/', (req, res) => {

    let { authorization, url } = getAuthorization({ 'q': notWantedKeywords + wantedKeywords, 'count': QUERIES_AMOUNT, 'result_type': 'recent', 'tweet_mode': 'extended' });

    let config = {
        url: url,
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
