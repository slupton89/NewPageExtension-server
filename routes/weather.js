const express = require('express')
const { ORIGIN } = require('../config')

const weatherRouter = express.Router()

const cors = require('cors')
const whitelist = [ORIGIN, 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

weatherRouter.get('/', cors(corsOptions), (req, res) => {
    res.send('Nothing to see here™‚').status(204)
})

module.exports = weatherRouter