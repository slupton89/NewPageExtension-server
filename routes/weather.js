const express = require('express')

const weatherRouter = express.Router()

weatherRouter.get('/', (req, res) => {
    res.send('Nothing to see here 🙂').status(200)
})

module.exports = weatherRouter