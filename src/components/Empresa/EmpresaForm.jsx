import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import InputMask from "react-input-mask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EmpresaForm = ({ onSubmit, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState({
    descricao: "",
    razao_social: "",
    nome_fantasia: "",
    endereco: "",
    cnpj: "",
  });

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        descricao: initialData.descricao || "",
        razao_social: initialData.razao_social || "",
        nome_fantasia: initialData.nome_fantasia || "",
        endereco: initialData.endereco || "",
        cnpj: initialData.cnpj || "",
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

    if (!formData.cnpj) {
      alert("CNPJ é obrigatório!");
      return;
    }

    onSubmit(formData);

  
    if (Object.keys(initialData).length === 0) {
      setFormData({
        descricao: "",
        razao_social: "",
        nome_fantasia: "",
        endereco: "",
        cnpj: "",
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
            <InputMask
        mask="99.999.999/9999-99"
        value={formData.cnpj}
        onChange={(e) => handleChange(e)}
      >
        {() => (
          <TextField
            size="small"
            fullWidth
            label="CNPJ"
            margin="normal"
            name="cnpj"
            required
          />
        )}
      </InputMask>
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
        <Button
          type="submit"
          variant="contained"
          className="container__btn-salvar"
          endIcon={<CheckCircleIcon />}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default EmpresaForm;
