const express = require('express')
const { FLICKR_API_KEY, FLICKR_SECRET } = require('../config')
const Flickr = require('flickrapi'),
      flickerOptions = {
        api_key: FLICKR_API_KEY,
        secret: FLICKR_SECRET
      }

const backgroundRouter = express.Router()

backgroundRouter.get('/bg', (req, res) => {
  res.send({ response: 'Space!'}).status(200)
})


backgroundRouter.get('/bg/space/', (req, res, next) => {
  console.log('space!')
  res.send('Yup')
  Flickr.tokenOnly(flickerOptions, (error, flickr) => {
    flickr.photos.search({
      text: 'space landscape',
      per_page: 1
    }, (err, result) => {
          console.log(err !== null ? err : result.photo)
        })
  })

})

module.exports = backgroundRouter