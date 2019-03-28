const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const cors = require('cors')

const { PORT, DARKSKY_API_KEY, ORIGIN } = require('./config')
const weatherRouter = require('./routes/weather')
const backgroundRoute = require('./routes/backgrounds')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const whitelist = [ORIGIN, 'http://localhost:3000']
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.use(weatherRouter)
app.use(backgroundRoute)

let interval
let userCoords

io.on('connection', socket => {
  console.log('New client connected')
  socket.on('message', (loc) => {
    userCoords = loc
    console.log(userCoords)
    return getApiAndEmit(socket)
  })
  if(interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1800000)
  socket.on('disconnect', () => console.log('Client disconnected'))
})

const getApiAndEmit = async socket => {
  console.log('fetching')
  try {
    const res = await axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${userCoords[0]},${userCoords[1]}`)
    socket.emit('FromAPI', res.data.currently)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

server.listen(PORT, function () {
  console.log( "Listening on port " + PORT )
});