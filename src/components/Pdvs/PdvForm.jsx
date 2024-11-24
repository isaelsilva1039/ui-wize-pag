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
import { getFiliais } from "../../services/filialService";
import { getContratos } from "../../services/contratoService";
import { getTokens } from "../../services/tokens";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PdvForm = ({ onSubmit, onClose, token }) => {
  const [formData, setFormData] = useState({
    descricao: "",
    filialId: "",
    contratoId: "",
    tokenId: "",
  });

  const [filiais, setFiliais] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filiaisData = await getFiliais(token);
        setFiliais(filiaisData.data);

        const contratosData = await getContratos(token, 1 , 100);
        setContratos(contratosData.data);

        const tokensData = await getTokens(token);
        setTokens(tokensData.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [token]);

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
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="filial-label">Filial</InputLabel>
        <Select
          labelId="filial-label"
          name="filialId"
          value={formData.filialId}
          onChange={handleChange}
          required
        >
          {filiais.map((filial) => (
            <MenuItem key={filial.id} value={filial.id}>
              {filial.nome_fantasia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="contrato-label">Contrato</InputLabel>
        <Select
          labelId="contrato-label"
          name="contratoId"
          value={formData.contratoId}
          onChange={handleChange}
          required
        >
          {contratos.map((contrato) => (
            <MenuItem key={contrato.ID} value={contrato.ID}>
              {contrato.Nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="token-label">Token</InputLabel>
        <Select
          labelId="token-label"
          name="tokenId"
          value={formData.tokenId}
          onChange={handleChange}
          required
        >
          {tokens.map((token) => (
            <MenuItem key={token.id} value={token.id}>
              {token.descricao}
            </MenuItem>
          ))}
        </Select>
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

export default PdvForm;
