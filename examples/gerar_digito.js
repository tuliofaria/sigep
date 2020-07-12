const { geraDigitoVerificador } = require('../index')

const env = 'dev' // Em modo de produção, use "prod"

const meuUsuario = {
    usuario: 'sigep',
    senha: 'n5f9t8'
}

const etiquetas = ['DL61145929 BR', 'DL74668653 BR', 'DL76023727 BR']

geraDigitoVerificador(env, meuUsuario, etiquetas)
    .then(result => console.log(result))
    .catch(err => console.log(err))
