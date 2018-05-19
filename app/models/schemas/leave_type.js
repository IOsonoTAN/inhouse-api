const mongoose = require('mongoose')
const plugins = require('./helpers/plugins')

const collection = 'leave_type'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  collection
})

schema.post('save', (doc) => {
  console.log('doc ->', doc)
})

module.exports = mongoose.model(collection, plugins(schema))
