const express = require('express')

const weatherRouter = express.Router()

weatherRouter.get('/', (req, res) => {
    res.send('Nothing to see here 🙂').status(204)
})

module.exports = weatherRouter