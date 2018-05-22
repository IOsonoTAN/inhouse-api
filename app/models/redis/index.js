const redis = require('redis')
const redisDeleteWildCard = require('redis-delete-wildcard')
const { database } = require('../../config')

redisDeleteWildCard(redis)

const client = redis.createClient(database.redis)

client.on('connect', () => {
  console.log(`* redis connected to ${database.redis}`)
})

module.exports = client
