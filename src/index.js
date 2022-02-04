const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const PORT = config.get("api.port")

const app = express()

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})