import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import mockEmpresas from "../../mocks/empresa";
import mockTokens from "../../mocks/tokeks";

const PdvForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    descricao: "",
    cnpj: "",
    inscricaoEstadual: "",
    razaoSocial: "",
    nomeFantasia: "",
    endereco: "",
    idEmpresa: "", // Armazena o ID da empresa selecionada
    tokenId: "", // ID do token selecionado
    dataCriacao: new Date().toISOString().split("T")[0],
    userCriacao: "", // Popule com o usuário atual
    contribuinte: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // Gerencia mudanças para checkboxes e inputs comuns
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.tokenId) {
      alert("Por favor, selecione um token antes de cadastrar o PDV.");
      return;
    }
    onSubmit(formData);
    setFormData({
      id: "",
      descricao: "",
      cnpj: "",
      inscricaoEstadual: "",
      razaoSocial: "",
      nomeFantasia: "",
      endereco: "",
      idEmpresa: "",
      tokenId: "",
      dataCriacao: new Date().toISOString().split("T")[0],
      userCriacao: "",
      contribuinte: false,
    });
  };

  return (
    <Box
      component="form"
      sx={{ mt: 2 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >


      <TextField
        size="small"
        fullWidth
        label="Descrição"
        margin="normal"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        required
      />

      <FormControl fullWidth size="small" margin="normal">
        <InputLabel id="empresa-label">Empresa</InputLabel>
        <Select
          labelId="empresa-label"
          id="empresa-select"
          name="idEmpresa"
          value={formData.idEmpresa}
          onChange={handleChange}
          required
        >
          {mockEmpresas.map((empresa) => (
            <MenuItem key={empresa.id} value={empresa.id}>
              {empresa.nomeFantasia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" margin="normal">
        <InputLabel id="token-label">Token</InputLabel>
        <Select
          labelId="token-label"
          id="token-select"
          name="tokenId"
          value={formData.tokenId}
          onChange={handleChange}
          required
        >
          {mockTokens
            .filter((token) => token.status === "liberado")
            .map((token) => (
              <MenuItem key={token.id} value={token.id}>
                {token.descricao}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      
    </Box>
  );
};

export default PdvForm;
