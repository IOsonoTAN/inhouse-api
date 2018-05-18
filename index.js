require('dotenv').config()

const app = require('./app')
const config = require('./app/config')

const port = config.port

app.listen(port, () => {
  console.log(`* application is running on port ${port}`)
})
