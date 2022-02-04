const TabelaFornecedor = require('../../database/fornecedor/TabelaFornecedor')

class Fornecedor {
    constructor({id, nome, email, telefone, dataCriacao, dataAtualizacao, versao}) {
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.telefone = telefone,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async cadastrarFornecedor(){
        const resultado = await TabelaFornecedor.cadastrar({
            nome: this.nome,
            email: this.email,
            telefone: this.telefone
        })

        this.dataCriacao = resultado.dataCriacao,
        this.dataAtualizacao = resultado.dataAtualizacao,
        this.versao = resultado.versao

    }
}

module.exports = Fornecedor