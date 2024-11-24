import axios from "axios";
import { url_api } from "../components/api/url";

const API_URL = `${url_api}/api/v1/empresa`;

// Obtem todas as empresas com paginação
export const getEmpresas = async (token, page = 1, pageSize = 10) => {
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
    console.error("Erro ao buscar empresas:", error);
    throw error;
  }
};

// Cria uma nova empresa
export const createEmpresa = async (token, empresaData) => {
  try {
    const response = await axios.post(API_URL, empresaData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    throw error;
  }
};

// Edita uma empresa existente
export const updateEmpresa = async (token, id, empresaData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empresaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    throw error;
  }
};

// Exclui uma empresa
export const deleteEmpresa = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir empresa:", error);
    throw error;
  }
};



// Obtem todas as empresas com paginação
export const getEmpresasAll = async (token, page = 1, pageSize = 1000) => {
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
    console.error("Erro ao buscar empresas:", error);
    throw error;
  }
};