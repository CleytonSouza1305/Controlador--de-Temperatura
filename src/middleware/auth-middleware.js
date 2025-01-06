const jwt = require('jsonwebtoken')
const HttpError = require('../error/HttpError')
const authModel = require('../models/auth-model')

module.exports = {
  authenticateUser: (req, res, next) => {
    const headerBearer  = req.headers.authorization

    if (!headerBearer) throw new HttpError(400, 'Credenciais inválidas.')

      try {
        const token = headerBearer.split(" ")[1]

        const userAuthenticated = jwt.verify(token, process.env.JWT_KEY)

        req.user = userAuthenticated
        req.authenticated = true

        next()
      } catch (error) {
        throw new HttpError(401, 'Token inválido.')
      }
  },

  authenticateAdm: (req, res, next) => {
    if (!req.authenticated) throw new HttpError(401, 'Usuário não autenticado.')

    const id = req.user.id
    const user = authModel.getUserById(id)

    if (!user) throw new HttpError(404, 'Usuário não encontrado.')
      console.Console(user)
    if (user.role !== 'admin' || user.role !== 'standard') throw new HttpError(403, 'Usuário não autorizado.')

    next()
  }
}