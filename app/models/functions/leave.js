const Leave = require('../schema/leave')

module.exports.makeLeave = async (data) => {
  const leaveInfo = new Leave(data)
  leaveInfo.save()

  return leaveInfo
}
