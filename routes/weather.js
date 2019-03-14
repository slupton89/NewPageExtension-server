const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Nothing to see here 🙂').status(200)
})

module.exports = router