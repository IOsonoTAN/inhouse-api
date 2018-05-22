const { User } = require('../models/mongo')
const errors = require('../helpers/errors')
const googleProfileService = require('../services/google-profile')

module.exports.validateTokenAndGetUser = async (req, res, next) => {
  try {
    const { accessToken } = req.headers

    const { sub } = await googleProfileService.validateToken(accessToken)
    const profile = await User.getUserByGoogleId(sub)

    req.user = profile
    req.user.userId = profile._id

    next()
  } catch (e) {
    errors.responseError(res, e)
  }
}
