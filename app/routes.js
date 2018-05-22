const { errorObject } = require('./helpers/errors')
const { auth, parseHeaders } = require('./middlewares')
const { users, leaves } = require('./controllers')

module.exports = (app) => {
  app.use(parseHeaders.parseToken)
  app.use(auth.validateTokenAndGetUser)

  app.post('/users', users.signIn)
  app.get('/users/:id', users.getUserProfile)

  app.get('/leaves', leaves.getLeaves)
  app.post('/leaves', leaves.createLeave)
  app.delete('/leaves', leaves.removeLeave)

  app.use((req, res, next) => {
    res.status(404).send(errorObject('page not found'))
  })
}
