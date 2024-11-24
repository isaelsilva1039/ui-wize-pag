const mockPDVs = [
  {
    id: 1,
    descricao: "PDV Principal",
    status: "ativo",
    dataCriacao: "2023-01-15",
    userCriacao: "admin",
    dataAtivacaoToken: "2023-01-16",
    dataExpiracaoToken: "2024-01-15",
    criado_por : {
      id: 1,
      name: 'isae',
      tipo: 1,  
    },

    filial: {
      id: 1,
      descricao: "Filial Matriz",
      cnpj: "12.345.678/0001-99",
      inscricaoEstadual: "123.456.789.000",
      razaoSocial: "Empresa Matriz Ltda",
      nomeFantasia: "Matriz Central",
      endereco: "Rua Principal, 123, Centro, Cidade A, Estado X",
      dataCriacao: "2023-01-15",
      userCriacao: "admin",
      contribuinte: true,
    },

    contrato: {
      id: 1,
      nome: "Empresa Alpha",
      cnpj: "12.345.678/0001-99",
      cpf: "123.456.789-00",
      endereco: "Rua das Flores, 123, São Paulo, SP",
      pdv: "Multi",
      ativoInativo: "Ativo",
      telefone: "(11) 1234-5678",
      whatsapp: "(11) 91234-5678",
      email: "contato@empresaalpha.com.br",
      responsavel: "João Silva",
    },

    token:{
      id: 1,
      descricao: "PDV Principal",
      status: "ativo",
      token_pdv: "PDVKEY-12345",
      criado_por : {
        id: 1,
        name: 'isae',
        tipo: 1,  
      },
    }
  },

];


export default mockPDVs