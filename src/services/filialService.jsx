import axios from "axios";
import { url_api } from "../components/api/url";

const API_URL = `${url_api}/api/v1/filial`;

// Obtem todas as filiais com paginação
export const getFiliais = async (token, page = 1, pageSize = 10) => {
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
    console.error("Erro ao buscar filiais:", error);
    throw error;
  }
};

// Cria uma nova filial
export const createFilial = async (token, filialData) => {
  try {
    const response = await axios.post(API_URL, filialData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar filial:", error);
    throw error;
  }
};

// Edita uma filial existente
export const updateFilial = async (token, id, filialData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, filialData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar filial:", error);
    throw error;
  }
};

// Exclui uma filial
export const deleteFilial = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir filial:", error);
    throw error;
  }
};
