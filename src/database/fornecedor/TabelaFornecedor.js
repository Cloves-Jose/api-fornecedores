const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listarTudo() {
        return Modelo.findAll({ raw: true})
    },

    cadastrar(fornecedor) {
        return Modelo.create(fornecedor)
    }
}