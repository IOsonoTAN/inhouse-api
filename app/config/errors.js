module.exports = {
  generalError: {
    message: 'something went wrong, please contact to administrator'
  },
  userNotFound: {
    code: '1001',
    status: 404,
    message: 'user not found'
  },
  googleIdNotFound: {
    code: '1002',
    status: 404,
    message: 'user not found'
  },
  notCompanyMember: {
    code: '1003',
    status: 403,
    message: `you aren't a company member`
  },
  googleAccessError: {
    code: '1004',
    status: 403,
    message: 'something went wrong about "access-token", may it already expired'
  },
  missingGoogleId: {
    message: 'missing "googleId" for validating'
  }
}
