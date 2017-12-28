var soap = require('soap')

module.exports = function(env){
  var url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  if(env==='prod'){
    url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
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
        
      }
    }
  }

  return new Promise(function(resolve, reject){
    soap
      .createClient(url, function(err, client){
        if(err){
          reject(err)
        }else{
          resolve(sigepClient(client))
        }
      })
  })
}
