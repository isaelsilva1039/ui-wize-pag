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
} from "@mui/material";
import mockEmpresas from "../../mocks/empresa";

const FilialForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    descricao: "",
    cnpj: "",
    inscricaoEstadual: "",
    razaoSocial: "",
    nomeFantasia: "",
    endereco: "",
    idEmpresa: "", // Armazena o ID da empresa selecionada
    dataCriacao: "",
    userCriacao: "",
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
      dataCriacao: "",
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
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.contribuinte}
            onChange={handleChange}
            name="contribuinte"
          />
        }
        label="Contribuinte"
      />
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
      <TextField
        size="small"
        fullWidth
        label="CNPJ"
        margin="normal"
        name="cnpj"
        value={formData.cnpj}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Inscrição Estadual"
        margin="normal"
        name="inscricaoEstadual"
        value={formData.inscricaoEstadual}
        onChange={handleChange}
        required={formData.contribuinte} // Torna o campo obrigatório apenas se contribuinte for true
      />
      <TextField
        size="small"
        fullWidth
        label="Razão Social"
        margin="normal"
        name="razaoSocial"
        value={formData.razaoSocial}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Nome Fantasia"
        margin="normal"
        name="nomeFantasia"
        value={formData.nomeFantasia}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Endereço"
        margin="normal"
        name="endereco"
        value={formData.endereco}
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
    </Box>
  );
};

export default FilialForm;
