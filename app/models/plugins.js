const paginate = require('mongoose-paginate')
const timestamps = require('mongoose-timestamp')

module.exports = (schema) => {
  schema.plugin(paginate)
  schema.plugin(timestamps)

  return schema
}