const HttpError = require("../error/HttpError")
const temperatureModel = require("../models/temperature-model")

module.exports = {
  // /temperature
  allTemperature: (req, res) => {
    const temperatures = temperatureModel.allTemperatures()
    res.json(temperatures)
  },

  // POST /temperature
  createNewTemperature: (req, res) => {
    const user = req.user    
    
    const { temperature, freezer, freezerType } = req.body

    if (typeof temperature !== 'number' || typeof freezer !== 'number' || typeof freezerType !== 'string') {
      throw new HttpError(400, 'Tipos de dados incorretos.')
    }

    const newTemperature = temperatureModel.createTemperature(temperature, freezer, user.id, freezerType)

    res.status(201).json(newTemperature)
  } 
}