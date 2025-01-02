const HttpError = require("../error/HttpError")
const { createStandardUser, getUserByCpf, saveUser, createAdminUser, getAllUsers, getUserById } = require("../models/auth-model")
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
    saveUser(newUser)
    res.status(201).json(newUser)
  },

  // POST /auth/login
  login: (req, res) => {
    const { cpf, password } = req.body

    const user = getUserByCpf(cpf)
    if (!user) throw new HttpError(404, 'Usuário não encontrado.')

    const isValidPassword = bcrypt.compareSync(password, user.password)

    if (!isValidPassword) throw new HttpError(400, 'Credenciais inválidas.')

    const payload ={ id: user.id, cpf: user.cpf }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' })

    res.status(200).json({ token })
  },

  getUsers: (req, res) => {
    const users = getAllUsers()
    res.status(200).json(users)
  },
}