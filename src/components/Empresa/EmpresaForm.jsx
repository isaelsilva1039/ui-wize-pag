  import React, { useState, useEffect, useContext } from "react";
  import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    CircularProgress,
    Select,
    MenuItem,
    Typography,
  } from "@mui/material";
  import InputMask from "react-input-mask";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import { getContratosAll } from "../../services/contratoService";
  import { AuthContext } from "../../context/AuthContext";

  const EmpresaForm = ({ onSubmit, onClose, initialData = {} }) => {
    const [formData, setFormData] = useState({
      descricao: "",
      razao_social: "",
      nome_fantasia: "",
      endereco: "",
      cnpj: "",
      contrato: '',
    });
      const { token } = useContext(AuthContext);
      const [contratos, setContratos] = useState([]);
      const [loadingContratos, setLoadingContratos] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      if (Object.keys(initialData).length > 0) {
        setFormData({
          descricao: initialData.descricao || "",
          razao_social: initialData.razao_social || "",
          nome_fantasia: initialData.nome_fantasia || "",
          endereco: initialData.endereco || "",
          cnpj: initialData.cnpj || "",
          contrato: initialData.contrato ? initialData.contrato.ID : "",
        });
      }
    }, [initialData]);

    const handleChange = (event) => {
      const { name, value } = event.target;


      console.log(event.target)

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
          contrato: '',
        });
      }
    };


    console.log(formData)



      useEffect(() => {
        fetchContratos();
      }, []);
    
      const fetchContratos = async () => {
        
        setLoadingContratos(true);

        try {
          const response = await getContratosAll(token);
          setContratos(response.data);
        } catch (error) {
          console.error("Erro ao buscar empresas:", error);
        } finally {
          setLoadingContratos(false);
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

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="contrato">Contrato</InputLabel>
          {loadingContratos ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              labelId="contrato"
              id="contrato"
              name="contrato"
              value={formData.contrato || ''}

              onChange={(e) => {
                console.log("Selecionado contrato:", e.target.value);
                handleChange(e);
              }}
              error={!!errors?.contrato}
            >

              {contratos.map((contrato) => (
                <MenuItem key={contrato?.ID} value={contrato?.ID}>
                  {contrato?.Nome}
                </MenuItem>
              ))}
            </Select>
          )}
          {errors.contrato && <Typography color="error">{errors.contrato}</Typography>}
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

  export default EmpresaForm;
