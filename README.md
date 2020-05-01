# SIGEP Integration

## SOBRE
- Projeto desenvolvido em NodeJS utilizando async/await e Promises para utilização dos serviços 'ConsultaCEP' e 'SolicitaEtiquetas' dos correios.

Link Correios: http://www.corporativo.correios.com.br/encomendas/sigepweb/doc/Manual_de_Implementacao_do_Web_Service_SIGEP_WEB.pdf

# CONSULTA CEP
## Modo de Uso
```
var { consultaCEP } = require('../index')

consultaCEP('prod', '37552171')
  .then(address => console.log(address))
  .catch(err => console.log(err))
```

### Retorno
```
{
  bairro: 'Jardim Esplanada',
  cep: '37552171',
  cidade: 'Pouso Alegre',
  complemento2: '',
  end: 'Rua Maria das Dores Barbosa',
  uf: 'MG'
}
```

### Projeto Exemplo
- Pasta Examples > buscar_cep.js
```
    node examples/buscar_cep.js
```

# SOLICITA ETIQUETAS
## Modo de Uso
```
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
```

### Projeto Exemplo
- Pasta Examples > gen_tags.js
```
    node examples/gen_tags.js
```

## CONTRIBUIÇÕES
Fique à vontade para sugerir/realizar alterações. Mande-nos um Pull Request =)