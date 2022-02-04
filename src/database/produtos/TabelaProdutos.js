const Modelo = require('./ModeloTabelaProdutos')
const NaoEncontrado = require('../../err/NaoEncontrado')


module.exports = {

    listarProdutos(idFornecedor) {
        return Modelo.findAll({ 
            raw: true,
            where: {
                fornecedor: idFornecedor
            }
        })
    },

    cadastrar(fornecedor) {
        return Modelo.create(fornecedor)
    },

    async procurarPorId(idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })
        if(!encontrado) {
            throw new NaoEncontrado('Produto')
        }
        return encontrado
    }
}