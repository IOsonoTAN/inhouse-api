const errors = require('../helpers/errors')

module.exports.parseToken = (req, res, next) => {
  try {
    const { 'access-token': accessToken } = req.headers

    if (!accessToken) {
      errors.throwError('missing "access-token" in headers')
    }

    req.requestTime = Date.now()
    req.headers.accessToken = accessToken

    next()
  } catch (e) {
    errors.responseError(res, e)
  }
}
