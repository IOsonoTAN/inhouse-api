const paginate = require('mongoose-paginate')

module.exports = (schema) => {
  schema.plugin(paginate)

  return schema
}
