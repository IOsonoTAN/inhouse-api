const { OAuth2Client } = require('google-auth-library')
const errors = require('../helpers/errors')
const config = require('../config')

async function getProfile(accessToken) {
  try {
    const client = new OAuth2Client(config.google.clientId)

    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: config.google.clientId
    })

    const payload = ticket.getPayload()

    if (!payload.hd || (payload.hd !== config.hostDomain)) {
      errors.throwError(config.errors.notCompanyMember.message,
        config.errors.notCompanyMember.code,
        config.errors.notCompanyMember.status
      )
    }

    return payload
  } catch (e) {
    if (e.custom) {
      throw e
    }
    errors.throwError(config.errors.googleAccessError.message)
  }
}

module.exports = {
  getProfile
}
