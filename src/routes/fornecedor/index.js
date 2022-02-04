const roteador = require('express').Router()
const TabelaFornecedor = require('../../database/fornecedor/TabelaFornecedor')
const Fornecedor = require('../../models/fornecedor/Fornecedor')
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

roteador.post('/', async(req, res, next) => {
    try{
        const requisicao = req.body
        const fornecedor = new Fornecedor(requisicao)
        await fornecedor.cadastrarFornecedor()
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch(erro) {
        next(erro)
    }
})

module.exports = roteador