const mongoose = require('mongoose')
const plugins = require('../plugins')

const collection = 'user'

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  googleId: {
    type: String,
    unique: true,
    required: true
  },
  birthday: Date,
  picture: String,
  telephoneNumbers: [{
    number: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: Array,
    default: ['member']
  }
}, {
  versionKey: false,
  collection
})

module.exports = mongoose.model(collection, plugins(schema))
