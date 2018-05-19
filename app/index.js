const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const moment = require('moment-timezone')

const routes = require('./routes')
const { database, timezone } = require('./config')

const app = express()

moment.tz.setDefault(timezone)

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
