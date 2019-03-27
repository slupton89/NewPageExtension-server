require('dotenv').config()

module.exports = {
  FLICKR_API_KEY: process.env.FLICKR_API_KEY,
  FLICKR_SECRET: process.env.FLICKR_SECRET,
  DARKSKY_API_KEY: process.env.DARKSKY_API_KEY,
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN
}