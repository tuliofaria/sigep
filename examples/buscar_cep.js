var { consultaCEP } = require('../index')

consultaCEP('dev', '37552171')
  .then(address => console.log(address))
  .catch(err => console.log(err))