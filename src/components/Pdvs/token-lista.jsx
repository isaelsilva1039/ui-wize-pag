// src/components/TokenList.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import mockTokens from "../../mocks/tokeks";
import '../../styles/cardPdv/card-pdv.scss'

const statusColors = {
  gerado: "orange",
  liberado: "blue",
  expirado: "red",
  em_uso: "green",
};

const TokenList = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
        p: 2,
      }}
    >
      {mockTokens.map((token) => (
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
              Hash: {"***********************"}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Criado por: {token.userCriacao}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TokenList;
