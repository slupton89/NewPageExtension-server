const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send({ response: 'Working'}).status(200)
  res.end('Nothing to see here')
})

module.exports = router