const mongoose = require('mongoose')
const plugins = require('./helpers/plugins')

const collection = 'user'

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  google_id: {
    type: String,
    unique: true,
    required: true
  },
  birthday: Date,
  picture: String,
  telephone_numbers: [{
    number: String
  }],
  is_active: {
    type: Boolean,
    default: true
  },
  role: {
    type: Array,
    default: ['member']
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  collection
})

module.exports = mongoose.model(collection, plugins(schema))
