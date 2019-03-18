const express = require('express')
const { FLICKR_API_KEY, FLICKR_SECRET } = require('../config')
const Flickr = require('flickrapi'),
      flickerOptions = {
        api_key: FLICKR_API_KEY,
        secret: FLICKR_SECRET
      }

const backgroundRouter = express.Router()

backgroundRouter.get('/bg', (req, res, next) => {
  if(req.query.id) {
    Flickr.tokenOnly(flickerOptions, (error, flickr) => {
      flickr.galleries.getPhotos({
        gallery_id: req.query.id,
      }, (err, result) => {
            return err === true ? res.send({ error: err }).status(500)
                                : res.json(result.photos.photo)
        })
        return error !== null ? console.error(error) : null
    })
  } else {
    res.send('Nothing to see here 🙂').status(204)
  }
})

module.exports = backgroundRouter