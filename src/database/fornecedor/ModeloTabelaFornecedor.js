const Sequelize = require('sequelize')
const instancia = require('../index')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const config = {
    freezeTableName: true,
    tableName: 'tb_fornecedores',
    timestamp: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('tb_fornecedores', colunas, config)