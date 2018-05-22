const Leave = require('./schemas/leave')
const redis = require('../redis')

async function updateLeaveById(_id, data = {}) {
  const result = await Leave.findOneAndUpdate({ _id }, { $set: data }, { new: true })

  return result
}

async function getLeavesByUserId(userId, page = 1, conditions = {}) {
  const results = await Leave.paginate({
    user: userId,
    ...conditions
  }, {
    page,
    select: 'status leave_type start_date end_date notes created_at updated_at',
    populate: {
      path: 'leave_type',
      model: 'leave_type',
      select: 'name description'
    }
  })

  return results
}

async function makeLeave(userId, leaveTypeId, startDate, endDate, notes = '') {
  const leave = new Leave({
    leave_type: leaveTypeId,
    start_date: startDate,
    end_date: endDate,
    user: userId,
    notes
  })
  leave.save()

  return leave
}

async function removeLeave(leaveId) {
  await Leave.remove({
    _id: leaveId
  })

  redis.DEL(`leave:${leaveId}`)

  return true
}

module.exports = {
  makeLeave,
  removeLeave,
  updateLeaveById,
  getLeavesByUserId
}
