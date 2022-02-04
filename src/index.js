const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const formatosAceitos = require('./helpers/Serializador').formatosAceitos
const roteador = require('./routes/fornecedor/index')
const NaoEncontrado = require('./err/NaoEncontrado')
const DadosNaoFornecidos = require('./err/DadosNaoFornecidos')
const CampoInvalido = require('./err/CampoInvalido')
const ValorNaoSuportado = require('./err/ValorNaoSuportado')
const SerializadorErro = require('./helpers/Serializador').SerializadorErro
const PORT = config.get("api.port")

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)
    next()
})

app.use('/api/fornecedores', roteador)

app.use((erro, req, res, next) => {
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )
    res.status(status)
    res.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})