import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NovoClientForm = ({ initialData = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    cpf: "",
    endereco: "",
    pdv: "Mono",
    ativoInativo: true,
    telefone: "",
    whatsapp: "",
    email: "",
    responsavel: "",
  });

  // Atualiza apenas uma vez, quando `initialData` mudar
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        nome: initialData.Nome || "",
        cnpj: initialData.CNPJ || "",
        cpf: initialData.CPF || "",
        endereco: initialData.Endereco || "",
        pdv: initialData.PDV || "Mono",
        ativoInativo: initialData.AtivoInativo ?? true,
        telefone: initialData.Telefone || "",
        whatsapp: initialData.Whatsapp || "",
        email: initialData.Email || "",
        responsavel: initialData.Responsavel || "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "ativoInativo" ? value === "true" : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      nome: "",
      cnpj: "",
      cpf: "",
      endereco: "",
      pdv: "Mono",
      ativoInativo: true,
      telefone: "",
      whatsapp: "",
      email: "",
      responsavel: "",
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

      <FormControl fullWidth size="small" margin="normal">
        <InputLabel id="ativoInativo-label">Ativo/Inativo</InputLabel>
        <Select
          labelId="ativoInativo-label"
          id="ativoInativo-select"
          name="ativoInativo"
          value={formData.ativoInativo ? "true" : "false"}
          label="Ativo/Inativo"
          onChange={handleChange}
        >
          <MenuItem value="true">Sim</MenuItem>
          <MenuItem value="false">Não</MenuItem>
        </Select>
      </FormControl>

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

export default NovoClientForm;
