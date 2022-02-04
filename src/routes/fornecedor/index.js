const roteador = require('express').Router()
const TabelaFornecedor = require('../../database/fornecedor/TabelaFornecedor')
const SerializadorFornecedor = require('../../helpers/Serializador').SerializadorFornecedor

roteador.get('/', async (req, res, next) => {
    const resultado = await TabelaFornecedor.listarTudo()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.end(
        serializador.serializar(resultado)
    )
})


module.exports = roteador