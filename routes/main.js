const express = require('express')
const router = express.Router()

let cardsGroup = ''

router.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.get('/', (req, res) => {
  res.render('index', { cardsGroup })
})

module.exports = router
