const express = require('express')
const { FLICKR_API_KEY, FLICKR_SECRET } = require('../config')
const Flickr = require('flickrapi'),
      flickerOptions = {
        api_key: FLICKR_API_KEY,
        secret: FLICKR_SECRET
      }

const backgroundRouter = express.Router()

backgroundRouter.get('/bg', (req, res, next) => {
  if(req.query.type) {
    Flickr.tokenOnly(flickerOptions, (error, flickr) => {
      flickr.photos.search({
        text: req.query.type,
        per_page: 10
      }, (err, result) => {
            err === true ? res.send({ error: err }).status(500)
                        : res.send(result.photos.photo)
        })
        error !== null ? console.log(error) : null
    })
  } else {
    res.send('Nothing to see here 🙂').status(200)
  }
})

module.exports = backgroundRouter