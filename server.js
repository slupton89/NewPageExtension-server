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

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/43.7695,11.2558`)
    socket.emit('FromAPI', res.data.currently.temperature)
  } catch (error) {
    console.error(`Error: $(error.code)`)
  }
}

io.on('connection', socket => {
  console.log('New client connected')
  if(interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000)
  socket.on('disconnect', () => console.log('Client disconnected'))
})

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))