import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EmpresaForm = ({ onSubmit, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState({
    descricao: "",
    razao_social: "",
    nome_fantasia: "",
    endereco: "",
  });

  // Atualiza o estado apenas se initialData mudar e for relevante (edição)
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        descricao: initialData.descricao || "",
        razao_social: initialData.razao_social || "",
        nome_fantasia: initialData.nome_fantasia || "",
        endereco: initialData.endereco || "",
      });
    }
  }, [initialData]);

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

    // Limpa os campos apenas na criação
    if (Object.keys(initialData).length === 0) {
      setFormData({
        descricao: "",
        razao_social: "",
        nome_fantasia: "",
        endereco: "",
      });
    }
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
        name="razao_social"
        value={formData.razao_social}
        onChange={handleChange}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Nome Fantasia"
        margin="normal"
        name="nome_fantasia"
        value={formData.nome_fantasia}
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


      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="text"
          color="inherit"
          sx={{ mr: 1 }}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained" className="container__btn-salvar" endIcon={<CheckCircleIcon />}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default EmpresaForm;
