const TabelaProdutos = require('../../database/produtos/TabelaProdutos')


class Produtos {
    constructor({id, nome, quantidade, preco, categoria, fornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id,
        this.nome = nome,
        this.quantidade = quantidade,
        this.preco = preco,
        this.categoria = categoria,
        this.fornecedor = fornecedor,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async cadastrarProduto() {
        const resultado = await TabelaProdutos.cadastrar({
            nome: this.nome,
            quantidade: this.quantidade,
            preco: this.preco,
            categoria: this.categoria,
            fornecedor: this.fornecedor
        })
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao,
        this.versao = resultado.versao
    }

    async listarPeloId() {
        const resultado = await TabelaProdutos.procurarPorId(this.id, this.fornecedor)

        this.nome = resultado.nome
        this.quantidade = resultado.quantidade
        this.preco = resultado.preco
        this.categoria = resultado.categoria
        this.fornecedor = resultado.fornecedor
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
}

module.exports = Produtos