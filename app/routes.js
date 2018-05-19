const errors = require('./helpers/errors')
const middlewares = require('./middlewares')
const controllers = require('./controllers')

module.exports = (app) => {
  app.use(middlewares.parseToken)
  app.use(middlewares.validateTokenAndGetUser)

  app.post('/users', controllers.users.signIn)
  app.get('/users/:id', controllers.users.getUserProfile)

  app.get('/leaves', controllers.leaves.getAllLeaves)
  app.post('/leaves', controllers.leaves.createLeave)

  app.use((req, res, next) => {
    res.status(404).send(errors.errorObject('page not found'))
  })
}
