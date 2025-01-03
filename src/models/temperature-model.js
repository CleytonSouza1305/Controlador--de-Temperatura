const HttpError = require('../error/HttpError')

const uuid = require('uuid').v4

const temperature = [
  { 
    id: '1', 
    temperature: 10, 
    freezer: 1, 
    userId: '1', 
    date: new Date().toLocaleString(), 
    freezerType: 'Carnes'
  }
]

module.exports = {
  allTemperatures: () => temperature,

  getTemperatureById: (id) => temperature.find((t) => t.id === id),

  createTemperature: (temperature, freezer, userId, freezerType) => {
    const newTemperature = {
      id: uuid(),
      temperature,
      freezer,
      userId,
      date: new Date().toLocaleString(), 
      freezerType
    }
    return newTemperature
  },

  updateTemperature: (id, updatedTemperature) => {
    const index = temperature.findIndex((t) => t.id === id)
    if (index === -1) throw new HttpError(404, 'Temperature não encontrada.')

    temperature[index] = { ...temperature[index], ...updatedTemperature }
    return temperature[index]
  },

  deleteTemperature: (id) => {
    const index = temperature.findIndex((t) => t.id === id)
    if (index === -1) throw new HttpError(404, 'Temperature não encontrada.')

    temperature.slice(index, 1)
  }
}