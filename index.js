const soapClient = require('./lib/client')
const { prepareTags } = require('./lib/tag')

const consultaCEP = async (env, cep) => {
  const client = await soapClient(env)
  return new Promise((resolve, reject) => {
    client.consultaCEP({ cep }, (err, result) => {
      if (err) {
        reject(err.root.Envelope.Body.Fault.faultstring)
          ? { error: err.root.Envelope.Body.Fault.faultstring }
          : err
      }
      resolve(result.return)
    })
  })
}

const solicitaEtiquetas = async (env, newCredentials, identificador, qtdEtiquetas, idServico) => {
  const client = await soapClient(env)

  const credentials = {
    usuario: 'sigep',
    senha: 'n5f9t8'
  }

  if (newCredentials) {
    credentials.usuario = newCredentials.usuario
    credentials.senha = newCredentials.senha
  }

  const requestData = {
    tipoDestinatario: 'C',
    identificador,
    idServico,
    qtdEtiquetas,
    usuario: credentials.usuario,
    senha: credentials.senha
  }

  return new Promise((resolve, reject) => {
    client.solicitaEtiquetas(requestData, (err, etiquetas) => {
      if (err) {
        reject(err.root.Envelope.Body.Fault.faultstring)
          ? { error: err.root.Envelope.Body.Fault.faultstring }
          : err
      } else {
        resolve(prepareTags(etiquetas.return))
      }
    })
  })
}

module.exports = {
  consultaCEP,
  solicitaEtiquetas
}