const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listarTudo() {
        return Modelo.findAll()
    }
}