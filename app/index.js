const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes')
const { database } = require('./config')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

routes(app)

mongoose.connect(database.mongo)
mongoose.connection.on('connected', () => {
  console.log(`* mongoose connected to ${database.mongo}`)
})

module.exports = app
