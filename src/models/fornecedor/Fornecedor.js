const TabelaFornecedor = require('../../database/fornecedor/TabelaFornecedor')
const CampoInvalido = require('../../err/CampoInvalido')
const DadosNaoFornecidos = require('../../err/DadosNaoFornecidos')

class Fornecedor {
    constructor({id, nome, email, telefone, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.telefone = telefone,
        this.categoria = categoria,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async cadastrarFornecedor(){
        this.validar()
        const resultado = await TabelaFornecedor.cadastrar({
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            categoria: this.categoria
        })

        this.dataCriacao = resultado.dataCriacao,
        this.dataAtualizacao = resultado.dataAtualizacao,
        this.versao = resultado.versao

    }

    async listarPorId() {
        const resultado = await TabelaFornecedor.listarPorId(this.id)

        this.id = resultado.id
        this.nome = resultado.nome
        this.email = resultado.email
        this.telefone = resultado.telefone
        this.categoria = resultado.categoria
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizarFornecedor() {
        await TabelaFornecedor.listarPorId(this.id)
        const campos = ['nome', 'email', 'telefone', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    deletarFornecedor() {
        return TabelaFornecedor.deletar(this.id)

    }

    validar() {
        const fornecedor = ['nome', 'email', 'telefone', 'categoria']

        fornecedor.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Fornecedor