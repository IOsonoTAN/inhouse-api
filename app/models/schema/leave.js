const mongoose = require('mongoose')
const plugins = require('../plugins')

const collection = 'leave'

const schema = new mongoose.Schema({
  leaveType: {
    type: mongoose.Schema.ObjectId,
    ref: 'leave_type'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }
}, {
  versionKey: false,
  collection
})

module.exports = mongoose.model(collection, plugins(schema))
