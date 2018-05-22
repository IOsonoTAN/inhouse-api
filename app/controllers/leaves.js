const { Leave } = require('../models/mongo')
const { responseError } = require('../helpers/errors')

module.exports.createLeave = async (req, res) => {
  try {
    const { userId } = req.user
    const { leaveTypeId, startDate, endDate, notes } = req.body

    const result = await Leave.makeLeave(userId, leaveTypeId, startDate, endDate, notes)

    res.send(result)
  } catch (e) {
    responseError(res, e, e.status)
  }
}

module.exports.getLeaves = async (req, res) => {
  try {
    const conditions = {}
    const { page, type, status } = req.query
    const { userId } = req.user

    if (type) {
      conditions.leave_type = type
    }
    if (status) {
      conditions.status = status
    }

    const results = await Leave.getLeavesByUserId(userId, page, conditions)

    res.send(results)
  } catch (e) {
    responseError(res, e, e.status)
  }
}

module.exports.removeLeave = async (req, res) => {
  try {
    const { leaveId } = req.body
    const result = await Leave.removeLeave(leaveId)

    res.send(result)
  } catch (e) {
    responseError(res, e, e.status)
  }
}
