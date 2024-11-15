
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";


const ClientForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    cpf: '',
    endereco: '',
    pdv: 'Mono',
    ativoInativo: '',
    telefone: '',
    whatsapp: '',
    email: '',
    responsavel: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    setFormData({
      nome: '',
      cnpj: '',
      cpf: '',
      endereco: '',
      pdv: 'Mono',
      ativoInativo: '',
      telefone: '',
      whatsapp: '',
      email: '',
      responsavel: ''
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
        label="Nome"
        margin="normal"
        name="nome"
        value={formData.nome}
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
        label="CPF"
        margin="normal"
        name="cpf"
        value={formData.cpf}
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
        <InputLabel id="pdv-label">PDV (Mono ou Multi)</InputLabel>
        <Select
          labelId="pdv-label"
          id="pdv-select"
          name="pdv"
          value={formData.pdv}
          label="PDV (Mono ou Multi)"
          onChange={handleChange}
        >
          <MenuItem value="Mono">Mono</MenuItem>
          <MenuItem value="Multi">Multi</MenuItem>
        </Select>
      </FormControl>
      <TextField
        size="small"
        fullWidth
        label="Ativo/Inativo"
        margin="normal"
        name="ativoInativo"
        value={formData.ativoInativo}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Telefone"
        margin="normal"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="WhatsApp"
        margin="normal"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Email"
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Responsável"
        margin="normal"
        name="responsavel"
        value={formData.responsavel}
        onChange={handleChange}
        required
      />
    </Box>
  );
};

export default ClientForm;
