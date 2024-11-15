// src/mocks/tokens.js

const mockTokens = [
    {
      id: 1,
      descricao: "Token Principal",
      status: "gerado",
      filial: {
        id: 1,
        descricao: "Filial Matriz",
        nomeFantasia: "Matriz Central",
      },
      dataCriacao: "2023-01-15",
      dataAtivacaoToken: "",
      dataExpiracaoToken: "",
      hashReceptor: "abc123def456ghi789jkl012",
      userCriacao: "admin",
    },
    {
      id: 2,
      descricao: "Token Secundário",
      status: "liberado",
      filial: {
        id: 2,
        descricao: "Filial Secundária",
        nomeFantasia: "Secundária Norte",
      },
      dataCriacao: "2023-02-10",
      dataAtivacaoToken: "2023-02-12",
      dataExpiracaoToken: "2024-02-12",
      hashReceptor: "uvw345xyz678abc901def234",
      userCriacao: "user123",
    },
    {
      id: 3,
      descricao: "Token Norte",
      status: "em_uso",
      filial: {
        id: 3,
        descricao: "Filial Leste",
        nomeFantasia: "Leste Distribuidora",
      },
      dataCriacao: "2023-03-05",
      dataAtivacaoToken: "2023-03-06",
      dataExpiracaoToken: "2024-03-05",
      hashReceptor: "ghi789jkl012abc123def456",
      userCriacao: "user456",
    },
    {
      id: 4,
      descricao: "Token Leste",
      status: "expirado",
      filial: {
        id: 4,
        descricao: "Filial Oeste",
        nomeFantasia: "Oeste Comercial",
      },
      dataCriacao: "2023-04-01",
      dataAtivacaoToken: "",
      dataExpiracaoToken: "",
      hashReceptor: "xyz678uvw345ghi789abc123",
      userCriacao: "admin",
    },
    {
      id: 5,
      descricao: "Token Oeste",
      status: "liberado",
      filial: {
        id: 1,
        descricao: "Filial Matriz",
        nomeFantasia: "Matriz Central",
      },
      dataCriacao: "2023-05-15",
      dataAtivacaoToken: "2023-05-16",
      dataExpiracaoToken: "2024-05-15",
      hashReceptor: "def234abc901xyz678uvw345",
      userCriacao: "admin",
    },
  ];
  
  export default mockTokens;
  