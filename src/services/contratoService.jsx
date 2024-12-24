import axios from "axios";
import { url_api } from "../components/api/url";

const API_URL = `${url_api}/api/v1/contratos`; 


export const getContratos = async (token, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(API_URL, {
    params: {
        page: page,
        page_size: pageSize,
        },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    throw error;
  }
};

// Outras funções do serviço podem ser adicionadas aqui (criar, atualizar, deletar contratos)
export const createContrato = async (token, contratoData) => {
    try {
      const response = await axios.post(API_URL, contratoData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar contrato:", error);
      throw error;
    }
  };

// Edita um contrato
export const updateContrato = async (token, id, contratoData) => {
    try {
      const response = await axios.put(`${url_api}/api/v1/contrato/${id}`, contratoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar contrato:", error);
      throw error;
    }
  };
  
  // Exclui um contrato
  export const deleteContrato = async (token, id) => {
    try {
      const response = await axios.delete(`${url_api}/api/v1/contrato/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      throw error;
    }
  };




export const getContratosAll = async (token, page = 1, pageSize = 10000) => {
  try {
    const response = await axios.get(API_URL, {
    params: {
        page: page,
        page_size: pageSize,
        },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    throw error;
  }
};
