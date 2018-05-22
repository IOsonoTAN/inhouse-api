const mongoose = require('mongoose')
const plugins = require('./helpers/plugins')
const redis = require('../../redis')

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

const cacheKey = (id) => `leave:${id}`

schema.post('save', (doc) => {
  redis.SETEX(cacheKey(doc._id), ((60 * 60) * 24) * 30, JSON.stringify(doc))
})

schema.post('update', (doc) => {
  redis.SETEX(cacheKey(doc._id), ((60 * 60) * 24) * 30, JSON.stringify(doc))
})

module.exports = mongoose.model(collection, plugins(schema))
