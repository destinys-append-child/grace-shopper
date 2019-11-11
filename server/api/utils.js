const utils = {
  isUser(req, res, next) {
    res.user.id ? next(req) : res.status(403).send('No')
  },

  isAdmin(req, res, next) {
    req.user.isAdmin ? next(req) : res.status(403).send('Forbidden bruv')
  }
}

module.exports = {
  utils
}
