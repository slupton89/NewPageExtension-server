const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const cors = require('cors')

// const { PORT, DARKSKY_API_KEY } = require('./config')
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// const weather = require('./routes/weather')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)
// app.use(weather)

const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
  res.send({ response: 'Working'}).status(200)
  res.end('Nothing to see here')
})

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



server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});