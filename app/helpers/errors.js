function errorObject(message, code) {
  return {
    error: {
      code,
      message
    }
  }
}

function throwError(message, code = undefined, status = undefined) {
  const error = new Error(message)
  error.code = code
  error.status = status
  error.custom = true
  throw error
}

function responseError(res, error, status = 400) {
  const code = error.code
  const message = (!error.custom ? 'something went wrong!' : error.message)

  console.error(error.stack)

  res.status(status).send(errorObject(message, code))
}

module.exports = {
  errorObject,
  responseError,
  throwError
}
