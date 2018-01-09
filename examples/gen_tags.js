var sigep = require('../index')

sigep('prod', {
  usuario: '<usuario>',
  senha: '<senha>'
})
  .then(function(sigepClient){
    // codigo sedex
    const sedex = '124849'
    sigepClient
      .solicitaEtiquetas('<cnpj>', 5, sedex)
      .then( etiquetas => {
        console.log(etiquetas)
      })
  })
  .catch(function(err){
    console.log(err)
  })
