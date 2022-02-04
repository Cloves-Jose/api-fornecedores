const roteador = require('express').Router()
const TabelaFornecedor = require('../../database/fornecedor/TabelaFornecedor')
const Fornecedor = require('../../models/fornecedor/Fornecedor')
const SerializadorFornecedor = require('../../helpers/Serializador').SerializadorFornecedor

roteador.get('/', async (req, res, next) => {
    const resultado = await TabelaFornecedor.listarTudo()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type'),
        ['categoria']
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

roteador.get('/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.listarPorId()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['categoria']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    }catch(erro) {
        next(erro)
    }
})

roteador.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizarFornecedor()
        res.status(204)
        res.end()
    }catch(erro) {
        next(erro)
    }
})

roteador.delete('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const resultado = new Fornecedor({id: id})
        resultado.deletarFornecedor()
        res.status(204)
        res.end()
    } catch(erro) {
        next(erro)
    }
})


module.exports = roteador