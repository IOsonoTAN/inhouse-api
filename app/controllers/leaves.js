const { Leave } = require('../models')
const errors = require('../helpers/errors')

module.exports.createLeave = async (req, res) => {
  try {
    const { userId } = req.user
    const { leaveTypeId, startDate, endDate, notes } = req.body

    const result = await Leave.makeLeave(userId, leaveTypeId, startDate, endDate, notes)

    res.send(result)
  } catch (e) {
    errors.responseError(res, e, e.status)
  }
}

module.exports.getAllLeaves = async (req, res) => {
  try {
    const { page } = req.query
    const { userId } = req.user

    const results = await Leave.getAllLeavesByUserId(userId, page)

    res.send(results)
  } catch (e) {
    errors.responseError(res, e, e.status)
  }
}
