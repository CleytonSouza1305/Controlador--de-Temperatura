const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const authRouter = require('./routers/auth-routes')
const errorMiddleware = require('./middleware/error-middleware')
const temperatureRouter = require('./routers/temperature-router')

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/api', temperatureRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Aplicação iniciada em:\nhttp://localhost:${PORT}`))
