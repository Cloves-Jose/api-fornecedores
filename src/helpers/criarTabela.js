const modelos = [
    require('../database/fornecedor/ModeloTabelaFornecedor')
]

async function criarTabelas() {
    
    for(let i = 0; i < modelos.length; i++) {
        const modelo = modelos[i]
        await modelo.sync()
    }
}

criarTabelas()



