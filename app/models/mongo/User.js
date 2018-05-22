const User = require('./schemas/user')
const errors = require('../../helpers/errors')
const config = require('../../config')

async function createUser(data) {
  const profile = new User(data)
  profile.save()

  return profile
}

async function getUserById(id) {
  const profile = await User.findById(id)

  if (!profile) {
    errors.throwError(config.errors.userNotFound.message,
      config.errors.userNotFound.code,
      config.errors.userNotFound.status
    )
  }

  return profile
}

async function getUserByGoogleId(googleId) {
  const profile = await User.findOne({ google_id: googleId })

  if (!profile) {
    errors.throwError(config.errors.googleIdNotFound.message,
      config.errors.googleIdNotFound.code,
      config.errors.googleIdNotFound.status
    )
  }

  return profile
}

async function isCurrentUser(googleId) {
  try {
    if (!googleId) {
      errors.throwError(config.errors.missingGoogleId.message)
    }

    const profile = await getUserByGoogleId(googleId)

    return profile
  } catch (e) {
    if (e.code === config.errors.googleIdNotFound.code) {
      return false
    }
    throw e
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByGoogleId,
  isCurrentUser
}
