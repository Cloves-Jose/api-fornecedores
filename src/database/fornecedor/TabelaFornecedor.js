const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../err/NaoEncontrado')
module.exports = {
    listarTudo() {
        return Modelo.findAll({ raw: true})
    },

    cadastrar(fornecedor) {
        return Modelo.create(fornecedor)
    },

    async listarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!encontrado) {
            throw new NaoEncontrado('Fornecedor')
        }

        return encontrado
    },

    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id : id}
            }
        )
    },

    deletar(id) {
        return Modelo.destroy({
            where: {id : id}
        })
    }


}