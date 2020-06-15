# SIGEP Integration

## SOBRE
- Projeto desenvolvido em NodeJS utilizando async/await e Promises para utilização dos serviços 'ConsultaCEP' e 'SolicitaEtiquetas' dos correios.

## IMPORTANTE
- As etiquetas têm prazo de validade, portanto, os correios não permitem gerar aos sábados e domingos.

Link Correios: http://www.corporativo.correios.com.br/encomendas/sigepweb/doc/Manual_de_Implementacao_do_Web_Service_SIGEP_WEB.pdf

# CONSULTA CEP
## Modo de Uso
```
import { consultaCEP } from 'sigep'

consultaCEP('prod', '37552171')
  .then(address => console.log(address))
  .catch(err => console.log(err))
```
Ou usando async/await:
```
await consultaCEP('prod', '37552171')
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
import { solicitaEtiquetas } from 'sigep'

const meuUsuario = {
  usuario: '<usuario>',
  senha: '<senha>'
}
const cnpj = '<cnpj>'
const qtdeSolicitada = 2
const codSedex = '124849'

solicitaEtiquetas('prod', meuUsuario, cnpj, qtdeSolicitada, codSedex)
  .then(etiquetas => console.log(etiquetas))
  .catch(err => console.log(err))
```

Ou usando async/await:
```
await solicitaEtiquetas('prod', meuUsuario, cnpj, qtdeSolicitada, codSedex)
```

### Retorno
```
[
  'PY23232323BR', 'PY23231524BR'
]
```

### Projeto Exemplo
- Pasta Examples > gen_tags.js
```
    node examples/gen_tags.js
```


# TESTES
## [Não atualizado]

# CONTRIBUIÇÕES
- v2: Renato Siqueira [@renatosiqueira](https://github.com/renatosiqueira)

# Colaboradores:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->


# OUTRAS INFORMAÇÕES
Fique à vontade para sugerir/realizar alterações. Mande-nos um Pull Request =)
