var soap = require('soap')
var client = require('./lib/client')
var tag = require('./lib/tag')

module.exports = function(env, newCredentials){
  var url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  if(env==='prod'){
    url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  }

  const credentials = {
    usuario: 'sigep',
    senha: 'n5f9t8'
  }

  if(newCredentials){
    credentials.usuario = newCredentials.usuario
    credentials.senha = newCredentials.senha
  }

  function sigepClient(client){
    return {
      consultaCEP: function(cep){
        return new Promise(function(resolve, reject){
          client.consultaCEP({ cep: cep }, function(err, result){
            if(err){
              if(err.root.Envelope.Body.Fault.faultstring){
                reject({
                  error: err.root.Envelope.Body.Fault.faultstring
                })
              }else{
                reject(err)
              }
            }else{
              resolve(result.return)
            }
          })
        })
      },
      solicitaEtiquetas: function(identificador, qtdEtiquetas, idServico){
        console.log(credentials)
        return new Promise(function(resolve, reject){
          client.solicitaEtiquetas({
            tipoDestinatario: 'C',
            identificador: identificador,
            idServico: idServico,
            qtdEtiquetas: qtdEtiquetas,
            usuario: credentials.usuario,
            senha: credentials.senha
          }, function(err, etiquetas){
            if(err){
              reject(err)
            }else{
              resolve(tag.prepareTags(etiquetas.return))
            }
          })
        })
      }
    }
  }

  return client(soap, url, sigepClient)
}
