const jsontoxml = require('jsontoxml')
const ValorNaoSuportado = require('../err/ValorNaoSuportado')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados) {
        let tag = this.tagSingular

        if(Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }

        return jsontoxml({ [tag]: dados})
    }

    serializar(dados) {
        dados = this.filtrar(dados)

        if(this.contenType === 'application/json') {
            return this.json(dados)
        }

        if(this.contenType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contenType)
    }

    filtrarObjeto(dados) {
        const novoObjeto = {}

        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor (contenType, camposExtras) {
        super()
        this.contenType = contenType
        this.camposPublicos = [
            'id',
            'nome',
            'email',
            'telefone'
        ].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorProdutos extends Serializador {
    constructor(contenType, camposExtras) {
        super()
        this.contenType = contenType
        this.camposPublicos = [
            'id',
            'nome',
            'quantidade',
        ].concat(camposExtras || [])
        this.tagSingular = 'produto'
        this.tagPlural = 'produtos'
    }
}

class SerializadorErro extends Serializador {
    constructor(contenType, camposExtras) {
        super()
        this.contenType = contenType
        this.camposPublicos = [
            'id',
            'mensagem'
        ].concat(camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorProdutos: SerializadorProdutos,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}