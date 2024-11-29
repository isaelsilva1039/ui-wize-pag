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
import MaskedInput from "react-text-mask";
import { useSnackbar } from "notistack";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { mask, ...other } = props;
  return <MaskedInput {...other} ref={ref} mask={mask} />;
});

const ClientForm = ({ initialData = {}, onSubmit, onClose }) => {
  const { enqueueSnackbar } = useSnackbar(); // Hook do notistack
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    cpf: "",
    endereco: "",
    pdv: "Mono",
    ativo_inativo: true,
    telefone: "",
    whatsapp: "",
    email: "",
    responsavel: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        nome: initialData.Nome || "",
        cnpj: initialData.CNPJ || "",
        cpf: initialData.CPF || "",
        endereco: initialData.Endereco || "",
        pdv: initialData.PDV || "Mono",
        ativo_inativo: initialData.AtivoInativo ?? true,
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
      [name]: name === "ativo_inativo" ? value === "true" : value,
    }));
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Campo obrigatório.";
    if (!formData.cnpj) newErrors.cnpj = "Campo obrigatório.";
    if (!formData.cpf) newErrors.cpf = "Campo obrigatório.";
    if (!formData.endereco) newErrors.endereco = "Campo obrigatório.";
    if (!formData.telefone) newErrors.telefone = "Campo obrigatório.";
    if (!formData.email) newErrors.email = "Campo obrigatório.";
    if (!formData.responsavel) newErrors.responsavel = "Campo obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        await onSubmit(formData); // Aguarda a resposta da API
        enqueueSnackbar("Salvo com sucesso!", { variant: "success" }); // Notificação de sucesso
        setFormData({
          nome: "",
          cnpj: "",
          cpf: "",
          endereco: "",
          pdv: "Mono",
          ativo_inativo: true,
          telefone: "",
          whatsapp: "",
          email: "",
          responsavel: "",
        });
      } catch (error) {
        // Exibe uma notificação de erro
        enqueueSnackbar("Erro ao salvar. Tente novamente.", { variant: "error" });
      }
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
        label="Nome"
        margin="normal"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        error={!!errors.nome}
        helperText={errors.nome}
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
        InputProps={{
          inputComponent: TextMaskCustom,
          inputProps: { mask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/] },
        }}
        error={!!errors.cnpj}
        helperText={errors.cnpj}
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
        InputProps={{
          inputComponent: TextMaskCustom,
          inputProps: { mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/] },
        }}
        error={!!errors.cpf}
        helperText={errors.cpf}
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
          name="ativo_inativo"
          value={formData.ativo_inativo ? "true" : "false"}
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
        error={!!errors.telefone}
        helperText={errors.telefone}
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
        error={!!errors.email}
        helperText={errors.email}
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
        error={!!errors.responsavel}
        helperText={errors.responsavel}
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

export default ClientForm;
