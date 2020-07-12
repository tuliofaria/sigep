const { solicitaEtiquetas } = require('../index')

const env = 'dev' // Em modo de produção, use "prod"

const meuUsuario = {
  usuario: 'sigep',
  senha: 'n5f9t8'
}
const cnpj = '<cnpj>'
const qtdeSolicitada = 5
const codSedex = '124849'

solicitaEtiquetas(env, meuUsuario, cnpj, qtdeSolicitada, codSedex)
  .then(etiquetas => console.log(etiquetas))
  .catch(err => console.log(err))
