import axios from "axios";
import { url_api } from "../components/api/url";
// Configuração base para a API
const apiClient = axios.create({
    baseURL: `${url_api}/api/v1/pdv`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Obtem tokens liberados
export const getTokens = async (token, page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get("/token", {
            params: { page, page_size: pageSize },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tokens:", error);
        throw error;
    }
};
