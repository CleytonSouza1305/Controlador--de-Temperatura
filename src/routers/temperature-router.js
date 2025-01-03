const express = require('express')
const temperatureController = require('../controllers/temperature-controller')
const temperatureRouter = express.Router()

temperatureRouter.get('/temperature', temperatureController.allTemperature)

module.exports = temperatureRouter