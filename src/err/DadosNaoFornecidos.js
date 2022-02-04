class DadosNaoFornecidos extends Error {
    constructor(erro) {
        const mensagem = `Os dados de ${erro} não forma fornecidos`
        super('mensagem')
        this.name = 'CampoInvalido'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos