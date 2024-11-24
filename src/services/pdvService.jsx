import axios from "axios";
import { url_api } from "../components/api/url";

// Configuração base para a API
const apiClient = axios.create({
    baseURL: `${url_api}/api/v1"`,
    headers: {
        "Content-Type": "application/json",
    },
});



const API_URL = `${url_api}/api/v1/pdv`;

// Obtem todas as filiais com paginação
export const getPdvs = async (token, page = 1, pageSize = 10) => {
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


export const createPdv = async (token, pdvData) => {
    try {
      const response = await axios.post(API_URL, pdvData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar PDV:", error);
      throw error;
    }
  };