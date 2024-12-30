const HttpError = require("../error/HttpError")
const { createStandardUser, getUserByCpf } = require("../models/auth-model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, cpf, password } = req.body
    if (typeof name !== 'string' || typeof cpf !== 'string' || typeof password !== 'string') {
      throw new HttpError(400, 'Credenciais inválidas.')
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = createStandardUser(name, cpf, hashedPassword)
    res.status(201).json(newUser)
  },

  // POST /auth/login
  login: (req, res) => {
    const { cpf, password } = req.body

    const user = getUserByCpf(cpf)
    if (!user) throw new HttpError(404, 'Usuário não encontrado.')

    if (user.password !== password) throw new HttpError(400, 'Credenciais inválidas.')

    const payload ={ id: user.id, name: user.name }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' })

    req.authenticated = true
    req.authenticatedUser = token

    res.status(200).json(token)
  }
}