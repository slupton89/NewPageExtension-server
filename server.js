const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')

const { PORT, DARKSKY_API_KEY } = require('./config')
const weather = require('./routes/weather')

const app = express()

app.use(weather)

const server = http.createServer(app)
const io = socketIo(server)

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
    socket.emit('FromAPI', res.data.currently.temperature)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}



server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))