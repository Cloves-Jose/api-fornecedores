const Sequelize = require('sequelize')
const instancia = require('../../database/index')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //Relacionando com a tabela de fornecedores
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: {
            model: require('../fornecedor/ModeloTabelaFornecedor'),
            key: 'id'
        }
    }
}

const config = {
    freezeTableName: true,
    tableName: 'tb_produtos',
    timestamp: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('tb_produtos', colunas, config)