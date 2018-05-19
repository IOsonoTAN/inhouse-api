const mongoose = require('mongoose')
const plugins = require('./helpers/plugins')

const collection = 'leave'

const schema = new mongoose.Schema({
  leave_type: {
    type: mongoose.Schema.ObjectId,
    ref: 'leave_type'
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied', 'cancelled'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
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
