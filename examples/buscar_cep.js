const { consultaCEP } = require('../index')

const env = 'dev' // Em modo de produção, use "prod"

consultaCEP(env, '37552171')
  .then(address => console.log(address))
  .catch(err => console.log(err))