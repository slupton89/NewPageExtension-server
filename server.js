const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')

const { PORT, DARKSKY_API_KEY } = require('./config')
const weatherRouter = require('./routes/weather')
const backgroundRouter = require('./routes/backgrounds')
const pingRouter = require('./routes/ping')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(weatherRouter)
app.use(backgroundRouter)
app.use(pingRouter)
let interval
let userCoords

io.on('connection', socket => {
  socket.on('message', (loc) => {
    userCoords = loc
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