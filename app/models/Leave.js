const Leave = require('./schemas/leave')

async function updateLeaveById(_id, data = {}) {
  const result = await Leave.findOneAndUpdate({ _id }, { $set: data }, { new: true })

  return result
}

async function getAllLeavesByUserId(userId, page = 1, conditions = undefined) {
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

module.exports = {
  makeLeave,
  updateLeaveById,
  getAllLeavesByUserId
}
