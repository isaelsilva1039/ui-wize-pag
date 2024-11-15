import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";

const EmpresaForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
 
    descricao: '',
    razaoSocial: '',
    nomeFantasia: '',
    endereco: '',
    idCliente: '',
    dataCriacao: '',
    userCriacao: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    setFormData({
      id: '',
      descricao: '',
      razaoSocial: '',
      nomeFantasia: '',
      endereco: '',

      dataCriacao: '',
      userCriacao: '',
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
  
    </Box>
  );
};

export default EmpresaForm;
