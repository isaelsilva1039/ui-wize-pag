import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getEmpresasAll } from "../../services/empresaService";
import { AuthContext } from "../../context/AuthContext";



const FilialForm = ({ onSubmit, onClose, initialData = {} }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    descricao: initialData.descricao || "",
    cnpj: initialData.cnpj || "",
    inscricao_estadual: initialData.inscricao_estadual || "",
    razao_social: initialData.razao_social || "",
    nome_fantasia: initialData.nome_fantasia || "",
    endereco: initialData.endereco || "",
    fk_empresa: initialData.fk_empresa || "",
    contribuinte: initialData.contribuinte || false,
  });

  const [errors, setErrors] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    fetchEmpresas(); // Busca as empresas quando o componente é montado
  }, []);

  const fetchEmpresas = async () => {
    setLoadingEmpresas(true);
    try {
      const response = await getEmpresasAll(token); // Assumindo que o token já está sendo gerenciado no serviço
      setEmpresas(response.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    } finally {
      setLoadingEmpresas(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.descricao) newErrors.descricao = "Descrição é obrigatória";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.razao_social) newErrors.razao_social = "Razão Social é obrigatória";
    if (!formData.nome_fantasia) newErrors.nome_fantasia = "Nome Fantasia é obrigatório";
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório";
    if (!formData.fk_empresa) newErrors.fk_empresa = "Empresa é obrigatória";
    if (formData.contribuinte && !formData.inscricao_estadual) {
      newErrors.inscricao_estadual = "Inscrição Estadual é obrigatória para contribuintes";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
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
        error={!!errors.descricao}
        helperText={errors.descricao}
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
        error={!!errors.cnpj}
        helperText={errors.cnpj}
        required
      />
      <TextField
        size="small"
        fullWidth
        label="Inscrição Estadual"
        margin="normal"
        name="inscricao_estadual"
        value={formData.inscricao_estadual}
        onChange={handleChange}
        error={!!errors.inscricao_estadual}
        helperText={errors.inscricao_estadual}
        disabled={!formData.contribuinte}
      />
      <TextField
        size="small"
        fullWidth
        label="Razão Social"
        margin="normal"
        name="razao_social"
        value={formData.razao_social}
        onChange={handleChange}
        error={!!errors.razao_social}
        helperText={errors.razao_social}
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
        error={!!errors.nome_fantasia}
        helperText={errors.nome_fantasia}
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
        error={!!errors.endereco}
        helperText={errors.endereco}
        required
      />
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="fk_empresa_label">Empresa</InputLabel>
        {loadingEmpresas ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            labelId="fk_empresa_label"
            id="fk_empresa"
            name="fk_empresa"
            value={formData.fk_empresa}
            onChange={handleChange}
            error={!!errors.fk_empresa}
          >
            {empresas.map((empresa) => (
              <MenuItem key={empresa.id} value={empresa.id}>
                {empresa.nome_fantasia}
              </MenuItem>
            ))}
          </Select>
        )}
        {errors.fk_empresa && <Typography color="error">{errors.fk_empresa}</Typography>}
      </FormControl>
    
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

export default FilialForm;
