const HttpError = require('../error/HttpError')
const authModel = require('./auth-model')

const uuid = require('uuid').v4

const temperatureArr = [
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
  allTemperatures: () => temperatureArr,

  getTemperatureById: (id) => temperatureArr.find((t) => t.id === id),

  createTemperature: (temperature, freezer, userId, freezerType) => {
    const user = authModel.getUserById(userId)
    
    const newTemperature = {
      id: uuid(),
      temperature,
      freezer,
      userId,
      userName: user.name,
      date: new Date().toLocaleString(), 
      freezerType
    }
    
    temperatureArr.push(newTemperature)
    return newTemperature
  },

  updateTemperature: (id, updatedTemperature) => {
    const index = temperatureArr.findIndex((t) => t.id === id)
    if (index === -1) throw new HttpError(404, 'Temperature não encontrada.')

    temperatureArr[index] = { ...temperatureArr[index], ...updatedTemperature }
    return temperatureArr[index]
  },

  deleteTemperature: (id) => {
    const index = temperatureArr.findIndex((t) => t.id === id)
    if (index === -1) throw new HttpError(404, 'Temperature não encontrada.')

    temperatureArr.slice(index, 1)
  }
}