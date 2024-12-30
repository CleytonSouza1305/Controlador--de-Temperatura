const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const authRouter = require('./routers/auth-routes')

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Aplicação iniciada em:\nhttp://localhost:${PORT}`))
