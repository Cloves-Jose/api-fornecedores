const roteador = require('express').Router({ mergeParams: true })
const TabelaProduto = require('../../database/produtos/TabelaProdutos')
const Produtos = require('../../models/produtos/Produtos')
const SerializadorProduto = require('../../helpers/Serializador').SerializadorProdutos

roteador.get('/', async (req, res, next) => {
    try{
        const idFornecedor = parseInt(req.fornecedor.id)
        const produto = await TabelaProduto.listarProdutos(idFornecedor)
        res.status(200)
        const serializador = new SerializadorProduto(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(produto)
        )
    }catch(erro) {
        next(erro)
    }
})

roteador.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const dadosRequisicao = req.body
        const dados = Object.assign({}, dadosRequisicao, { fornecedor: idFornecedor})
        const produto = new Produtos(dados)
        await produto.cadastrarProduto()
        res.status(201)
        const serializador = new SerializadorProduto(
            res.getHeader('Content-Type'),
            
        )
        res.set('Etag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/fornecedores/${produto.fornecedor}/produto/${produto.id}`)
        res.send(
            serializador.serializar(produto)
        )
    } catch(erro) {
        next(erro)
    }
})

roteador.get('/:id', async (req, res, next) => {
    try{
        const dados = {id: req.params.id, fornecedor: req.fornecedor.id}
        const produto = new Produtos(dados)
        await produto.listarPeloId()
        res.status(200)
        const serializador = new SerializadorProduto(
            res.getHeader('Content-Type'),
            ['preco', 'quantidade', 'fornecedor', 'dataCriacao', 'dataAtualizacao']
        )
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.send(
            serializador.serializar(produto)
        )
    } catch(erro) {
        next(erro)
    }
})

module.exports = roteador