const express = require('express')
const temperatureController = require('../controllers/temperature-controller')
const { authenticateUser, authenticateAdm } = require('../middleware/auth-middleware')
const temperatureRouter = express.Router()

temperatureRouter.get('/temperature', temperatureController.allTemperature)
temperatureRouter.post('/temperature', authenticateUser, authenticateAdm, temperatureController.createNewTemperature)

module.exports = temperatureRouter