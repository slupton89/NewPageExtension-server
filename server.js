const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')

const port = process.env.PORT || 8080
const index = require('./routes/weather')

const app = express()

app.use(weather)

const server = http.createServer(app)
const io = socketIo(server)

const getApiAndEmit = 'TODO'
