var { solicitaEtiquetas } = require('../index')

const meuUsuario = {
  usuario: '<usuario>',
  senha: '<senha>'
}
const cnpj = '<cnpj>'
const qtdeSolicitada = 5
const codSedex = '124849'

solicitaEtiquetas('prod', meuUsuario, cnpj, qtdeSolicitada, codSedex)
  .then(etiquetas => console.log(etiquetas))
  .catch(err => console.log(err))
