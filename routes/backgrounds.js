const express = require('express')
const { FLICKR_API_KEY, FLICKR_SECRET } = require('../config')
const Flickr = require('flickrapi'),
      flickerOptions = {
        api_key: FLICKR_API_KEY,
        secret: FLICKR_SECRET
      }

const backgroundRouter = express.Router()

backgroundRouter.get('/bg', (req, res) => {
  res.send('Nothing to see here 🙂').status(200)
})


backgroundRouter.get('/bg/space', (req, res, next) => {
  Flickr.tokenOnly(flickerOptions, (error, flickr) => {
    flickr.photos.search({
      text: 'space landscape',
      per_page: 1
    }, (err, result) => {
          err === true ? res.send({ error: err }).status(500)
                       : res.send(result.photos.photo)
      })
  })
})

module.exports = backgroundRouter