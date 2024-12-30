const HttpError = require('../error/HttpError')

const uuid = require('uuid').v4

const users = [
  { id: '1', name: 'Cleyton', cpf: '12345678987', password: '0000', role: 'admin' }
]

module.exports = {
  getAllUsers: () => users.map((user) => ({ id: user.id, name: user.name })),

  getUserById: (id) => users.find((user) => user.id === id),

  getUserByCpf: (cpf) => users.find((user) => user.cpf === cpf),

  createStandardUser: (name, cpf, password) => {
    const newUser = {
      id: uuid(),
      name,
      cpf,
      password,
      role: 'standard'
    }
    return newUser
  },

  createAdminUser: (name, cpf, password) => {
    const newUser = {
      id: uuid(),
      name,
      cpf,
      password,
      role: 'admin'
    }
    return newUser
  },

  saveUser: (user) => {
    users.push(user)
  },

  deleteUser: (id) => {
    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) throw new HttpError(404, 'Usuário não encontrado!')

    users.slice(userIndex, 1)
  }
}