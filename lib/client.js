var soap = require('soap')

const correiosURL = type => `https://${type}.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl`

const clientSoap = async (env) => {
  const url = correiosURL(env === 'prod' ? 'apps' : 'apphom')
  return await soap.createClientAsync(url)
}

module.exports = clientSoap