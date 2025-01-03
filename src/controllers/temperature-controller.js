const temperatureModel = require("../models/temperature-model")

module.exports = {
  // /temperature
  allTemperature: (req, res) => {
    const temperatures = temperatureModel.allTemperatures()
    res.json(temperatures)
  }
}