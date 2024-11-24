import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import '../../styles/cardPdv/card-pdv.scss';
import { AuthContext } from "../../context/AuthContext"; // Para obter o token do usuário
import { getTokens } from "../../services/tokens";

const statusColors = {
  gerado: "orange",
  liberado: "blue",
  expirado: "red",
  em_uso: "green",
};

const TokenList = () => {
  const { token } = useContext(AuthContext); // Obtém o token de autenticação
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await getTokens(token); // Chama o serviço para buscar os tokens
        setTokens(response.data); // Supondo que os tokens estão na propriedade `data`
      } catch (error) {
        console.error("Erro ao buscar tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
        p: 2,
      }}
    >
      {tokens.map((token) => (
        <Card
          className="card-pdv"
          key={token.id}
          sx={{
            borderLeft: `3px solid ${statusColors[token.status] || "gray"}`,
            boxShadow: 1,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {token.descricao}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Status: <Chip label={token.status} sx={{ backgroundColor: statusColors[token.status], color: "white" }} size="small" />
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Data de Criação: {token.dataCriacao}
            </Typography>

            {token.dataAtivacaoToken && (
              <Typography variant="body2" color="textSecondary">
                Data de Ativação: {token.dataAtivacaoToken}
              </Typography>
            )}

            {token.dataExpiracaoToken && (
              <Typography variant="body2" color="textSecondary">
                Data de Expiração: {token.dataExpiracaoToken}
              </Typography>
            )}

            <Typography variant="body2" color="textSecondary">
              Criado por: {token.user.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TokenList;
