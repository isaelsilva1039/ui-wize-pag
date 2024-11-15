// src/components/Filiais/FilialCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { FaCircle } from "react-icons/fa";

const FilialCard = ({ filial, onToggleStatus }) => {
  return (
    <Card
      sx={{
        width: 300,
        margin: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip title={filial.contribuinte ? "Ativo" : "Inativo"}>
            <FaCircle
              style={{ color: filial.contribuinte ? "green" : "red" }}
              size={12}
            />
          </Tooltip>
          <IconButton onClick={() => onToggleStatus(filial.id)}>
            {filial.contribuinte ? <Star /> : <StarBorder />}
          </IconButton>
        </Box>
        <Typography variant="h6" gutterBottom>
          {filial.nomeFantasia}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {filial.razaoSocial}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {filial.endereco}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          ID Empresa: {filial.idEmpresa?.id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FilialCard;
