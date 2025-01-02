module.exports = {
  authenticateStandardUser: (req, res, next) => {
    console.log(req.authenticatedUser)
  }
}