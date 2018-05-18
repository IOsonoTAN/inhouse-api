const { user } = require('../models')
const errors = require('../helpers/errors')
const googleProfileService = require('../services/google-profile')

module.exports.signIn = async (req, res) => {
  try {
    const googleProfile = await googleProfileService.getProfile(req.headers.accessToken)
    const { sub: googleId } = googleProfile

    const profile = await user.isCurrentUser(googleId)
    if (profile) {
      return res.status(200).send(profile)
    }

    const newProfile = await user.createUser({
      googleId,
      name: googleProfile.given_name,
      surname: googleProfile.family_name,
      email: googleProfile.email,
      picture: googleProfile.picture
    })

    return res.status(201).send(newProfile)
  } catch (e) {
    errors.responseError(res, e, e.status)
  }
}

module.exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const result = await user.getUserById(id)

    res.send(result)
  } catch (e) {
    errors.responseError(res, e, e.status)
  }
}
