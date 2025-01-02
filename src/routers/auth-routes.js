const express = require('express')
const authController = require('../controllers/auth-controller')
const { authenticateUser, authenticateAdm } = require('../middleware/auth-middleware')
const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

authRouter.post('/admin/register', authenticateUser, authController.createUserAdmin)
authRouter.get('/admin/users', authenticateUser, authenticateAdm, authController.getUsers)
authRouter.get('/admin/users/:id', authenticateUser, authenticateAdm, authController.userbyId)

module.exports = authRouter