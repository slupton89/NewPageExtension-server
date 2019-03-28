const express = require('express')
const cors = require('cors')

const corsOptions = {
  origin: false
}

const pingRouter = express.Router()

pingRouter.get('/ping', cors(corsOptions), (req, res, next) => {
  res.send('Up!').status(200)
})

module.exports = pingRouter