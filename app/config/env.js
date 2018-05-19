module.exports = {
  timezone: process.env.TIMEZONE || 'Asia/Bangkok',
  hostDomain: process.env.HOST_DOMAIN || 'inhouse',
  port: process.env.PORT || 9000,
  database: {
    mongo: process.env.MONGO_URI || 'mongodb://localhost:27017/inhouse',
    redis: process.env.REDIS_URI || 'redis://localhost:6379'
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    secretId: process.env.GOOGLE_SECRET_ID || ''
  }
}
