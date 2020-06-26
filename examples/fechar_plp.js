const { fechaPlpVariosServicos } = require('../index')

const env = 'dev' // Em modo de produção, use "prod"

// Dados do Contrato
const meuUsuario = {
    usuario: 'sigep',
    senha: 'n5f9t8',
    cartaoPostagem: '0067599079'
}
const cartaoPostagem = '0067599079'
const numeroContrato = '9992157880'
const numeroDiretoria = '10'
const codigoAdministrativo = '17000190'
const nomeRemetente = 'Empresa Teste'
const logradouroRemetente = 'Avenida Central'
const numeroRemetente = '2370'
const complementoRemetente = 'Sala 1205, 12° andar'
const bairroRemetente = 'Capão Raso'
const cepRemetente = '81150050'
const cidadeRemetente = 'Curitiba'
const ufRemetente = 'PR'
const telefoneRemetente = '4133332222'
const faxRemetente = ''
const emailRemetente = 'teste@email.com'

// Lista de Destinatários
const listaObjetosPostais = [
    {
        numEtiqueta: 'PH185560916BR',
        codServicoPostagem: '04669',
        cubagem: '0,00',
        peso: '2500',
        nome: 'Fulano',
        telefone: '6233332222',
        celular: '61999991111',
        email: '',
        logradouro: 'Rua Central',
        complemento: 'Qd: 102',
        numero: '8065',
        bairro: 'Setor Industrial',
        cidade: 'Goiânia',
        uf: 'GO',
        cep: '74503100',
        nf: '1424',
        descricaoObjeto: '',
        valorCobrar: '0,0',
        servicoAdicional: '25',
        valorDeclarado: '200,00',
        tipoObjeto: '002',
        dimensaoAltura: '8',
        dimensaoLargura: '20',
        dimensaoComprimento: '16',
        dimensaoDiametro: '0',
        statusProcessamento: '0'
    }
]

const prepareString = item => {
    return item.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

let xml =
    '<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>' +
    '<correioslog><tipo_arquivo>Postagem</tipo_arquivo><versao_arquivo>2.3</versao_arquivo>' +
    '<plp><id_plp /><valor_global/><mcu_unidade_postagem/><nome_unidade_postagem/>' +
    '<cartao_postagem>' + cartaoPostagem + '</cartao_postagem></plp>' +
    '<remetente><numero_contrato>' + numeroContrato + '</numero_contrato>' +
    '<numero_diretoria>' + numeroDiretoria + '</numero_diretoria>' +
    '<codigo_administrativo>' + codigoAdministrativo + '</codigo_administrativo>' +
    '<nome_remetente><![CDATA[' + nomeRemetente + ']]></nome_remetente>' +
    '<logradouro_remetente><![CDATA[' + logradouroRemetente + ']]></logradouro_remetente>' +
    '<numero_remetente><![CDATA[' + numeroRemetente + ']]></numero_remetente>' +
    '<complemento_remetente><![CDATA[' + complementoRemetente + ']]></complemento_remetente>' +
    '<bairro_remetente><![CDATA[' + bairroRemetente + ']]></bairro_remetente>' +
    '<cep_remetente><![CDATA[' + cepRemetente + ']]></cep_remetente>' +
    '<cidade_remetente><![CDATA[' + cidadeRemetente + ']]></cidade_remetente>' +
    '<uf_remetente>' + ufRemetente + '</uf_remetente>' +
    '<telefone_remetente><![CDATA[' + telefoneRemetente + ']]></telefone_remetente>' +
    '<fax_remetente><![CDATA[' + faxRemetente + ']]></fax_remetente>' +
    '<email_remetente><![CDATA[' + emailRemetente + ']]></email_remetente>' +
    '</remetente><forma_pagamento/>'

let destinatario = ''
const etiquetas = []

listaObjetosPostais.forEach(each => {

    etiquetas.push(each.numEtiqueta)

    const name = prepareString(each.nome)
    const complement = prepareString(each.complemento)
    const city = prepareString(each.cidade)
    const district = prepareString(each.bairro).substring(0, 28)
    const street = prepareString(each.logradouro).substring(0, 33)

    destinatario +=
        '<objeto_postal>' +
        '<numero_etiqueta>' + each.numEtiqueta + '</numero_etiqueta>' +
        '<codigo_objeto_cliente/>' +
        '<codigo_servico_postagem>' + each.codServicoPostagem + '</codigo_servico_postagem>' +
        '<cubagem>' + each.cubagem + '</cubagem>' +
        '<peso>' + each.peso + '</peso>' +
        '<rt1/><rt2/><destinatario>' +
        '<nome_destinatario><![CDATA[' + name + ']]></nome_destinatario>' +
        '<telefone_destinatario><![CDATA[' + each.telefone + ']]></telefone_destinatario>' +
        '<celular_destinatario><![CDATA[' + each.celular + ']]></celular_destinatario>' +
        '<email_destinatario><![CDATA[' + each.email + ']]></email_destinatario>' +
        '<logradouro_destinatario><![CDATA[' + street + ']]></logradouro_destinatario>' +
        '<complemento_destinatario><![CDATA[' + complement + ']]></complemento_destinatario>' +
        '<numero_end_destinatario><![CDATA[' + each.numero + ']]></numero_end_destinatario>' +
        '</destinatario><nacional>' +
        '<bairro_destinatario><![CDATA[' + district + ']]></bairro_destinatario>' +
        '<cidade_destinatario><![CDATA[' + city + ']]></cidade_destinatario>' +
        '<uf_destinatario><![CDATA[' + each.uf + ']]></uf_destinatario>' +
        '<cep_destinatario><![CDATA[' + each.cep + ']]></cep_destinatario>' +
        '<codigo_usuario_postal/><centro_custo_cliente/>' +
        '<numero_nota_fiscal>' + each.nf + '</numero_nota_fiscal>' +
        '<serie_nota_fiscal/><valor_nota_fiscal/><natureza_nota_fiscal/>' +
        '<descricao_objeto>' + each.descricaoObjeto + '</descricao_objeto>' +
        '<valor_a_cobrar>' + each.valorCobrar + '</valor_a_cobrar>' +
        '</nacional><servico_adicional>' +
        '<codigo_servico_adicional>' + each.servicoAdicional + '</codigo_servico_adicional>' +
        '<valor_declarado>' + each.valorDeclarado + '</valor_declarado>' +
        '</servico_adicional><dimensao_objeto>' +
        '<tipo_objeto>' + each.tipoObjeto + '</tipo_objeto>' +
        '<dimensao_altura>' + each.dimensaoAltura + '</dimensao_altura>' +
        '<dimensao_largura>' + each.dimensaoLargura + '</dimensao_largura>' +
        '<dimensao_comprimento>' + each.dimensaoComprimento + '</dimensao_comprimento>' +
        '<dimensao_diametro>' + each.dimensaoDiametro + '</dimensao_diametro>' +
        '</dimensao_objeto><data_postagem_sara/>' +
        '<status_processamento>' + each.statusProcessamento + '</status_processamento>' +
        '<numero_comprovante_postagem/><valor_cobrado/></objeto_postal>'
})

xml += destinatario + '</correioslog>'

fechaPlpVariosServicos(env, xml, etiquetas, meuUsuario)
    .then(result => console.log(result))
    .catch(err => console.log(err))
