import React, { useContext, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Tab,
  Tabs,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Payment, AttachMoney, ShoppingCart, CheckCircle } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/contatos/formulario-pagamentos.scss";
import { AuthContext } from "../../context/AuthContext";

// Mapeamentos de valores traduzidos para enums do backend
const billingTypeMap = {
  "Indefinido": "UNDEFINED",
  "Boleto": "BOLETO",
  "Cartão de Crédito": "CREDIT_CARD",
  "PIX": "PIX",
};

const chargeTypeMap = {
  "Desvinculado": "DETACHED",
  "Recorrente": "RECURRENT",
  "Parcelado": "INSTALLMENT",
};

const subscriptionCycleMap = {
  "Semanal": "WEEKLY",
  "Quinzenal": "BIWEEKLY",
  "Mensal": "MONTHLY",
  "Bimestral": "BIMONTHLY",
  "Trimestral": "QUARTERLY",
  "Semestral": "SEMIANNUALLY",
  "Anual": "YEARLY",
};

// Função para converter valores traduzidos para enums
const mapTranslatedToEnum = (value, map) => {
  return Object.keys(map).includes(value) ? map[value] : value;
};

// Função para formatar a data para YYYY-MM-DD
const formatDateToInput = (date) => {
  if (!date || date === "") return "";
  if (typeof date === "string" && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    console.error("Invalid date value:", date);
    return "";
  }
  return d.toISOString().split("T")[0];
};

const ShopFormEdit = ({ onUpdate, initialData, id }) => {
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      value: 0,
      dueDateLimitDays: 3,
      cycle: "MONTHLY",
      maxInstallmentCount: 1,
      isAddressRequired: false,
      notificationEnabled: true,
      endDate: "", // Inicialmente vazio, será preenchido pelo reset
      successUrl: "https://evolutto.com",
      autoRedirect: true,
      billingType: "UNDEFINED",
      chargeType: "DETACHED",
      subscriptionCycle: "MONTHLY",
    },
  });

  const [value, setValueTab] = useState(0);
  const [freight] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Observando os valores em tempo real
  const productName = watch("name");
  const productValue = watch("value");
  const paymentType = watch("billingType");
  const chargeType = watch("chargeType");

  // Reset form com mapeamento de valores traduzidos
  useEffect(() => {
    if (initialData) {
      console.log("initialData received:", initialData);
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        value: initialData.value || 0,
        dueDateLimitDays: initialData.dueDateLimitDays || 3,
        cycle: mapTranslatedToEnum(initialData.subscriptionCycle || initialData.cycle, subscriptionCycleMap) || "MONTHLY",
        maxInstallmentCount: initialData.maxInstallmentCount || 1,
        isAddressRequired: initialData.isAddressRequired ?? false,
        notificationEnabled: initialData.notificationEnabled ?? true,
        endDate: formatDateToInput(initialData?.endDate) || "", // Formata a data
        successUrl: initialData.callback?.successUrl || initialData.successUrl || "https://evolutto.com",
        autoRedirect: initialData.callback?.autoRedirect ?? initialData.autoRedirect ?? true,
        billingType: mapTranslatedToEnum(initialData.billingType, billingTypeMap) || "UNDEFINED",
        chargeType: mapTranslatedToEnum(initialData.chargeType, chargeTypeMap) || "DETACHED",
        subscriptionCycle: mapTranslatedToEnum(initialData.subscriptionCycle || initialData.cycle, subscriptionCycleMap) || "MONTHLY",
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    console.log("Current form values:", watch());
  }, [watch]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const onSubmit = async (data) => {
    if (value !== 2) return;

    setLoading(true);

    const payload = {
      billingType: data.billingType,
      chargeType: data.chargeType,
      name: data.name,
      description: data.description,
      endDate: data.endDate,
      value: data.value,
      dueDateLimitDays: data.dueDateLimitDays,
      externalReference: "[empresa_id:24]",
      notificationEnabled: data.notificationEnabled,
      callback: {
        successUrl: data.successUrl,
        autoRedirect: data.autoRedirect,
      },
      isAddressRequired: data.isAddressRequired,
      maxInstallmentCount: data.maxInstallmentCount,
      cycle: data.subscriptionCycle,
      empresa_id: 24,
    };

    console.log("Payload being sent:", payload);

    try {
      const url = `http://localhost:8000/api/pagamentos/payment-link/${id}`;
      const response = await axios.put(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Resposta da API", response.data);
      toast.success("Link atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error.response?.data || error);
      toast.error("Erro ao atualizar os dados. Tente novamente!");
    } finally {
      setLoading(false);
      setTimeout(() => {
        onUpdate();
      }, 1000);
    }
  };

  const handleNext = () => {
    if (value < 2) setValueTab(value + 1);
  };

  const handleBack = () => {
    if (value > 0) setValueTab(value - 1);
  };

  const subscriptionCycleOptions = {
    WEEKLY: "Semanal",
    BIWEEKLY: "Quinzenal",
    MONTHLY: "Mensal",
    BIMONTHLY: "Bimestral",
    QUARTERLY: "Trimestral",
    SEMIANNUALLY: "Semestral",
    YEARLY: "Anual",
  };

  // Função para validar se a data é a partir de hoje
  const validateEndDate = (value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data
    const selectedDate = new Date(value);
    return selectedDate >= today || "A data de encerramento deve ser a partir de hoje.";
  };

  return (
    <>
      <div className="formulario-pagamento" style={{ padding: "20px" }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="tabs">
          <Tab label="Item" />
          <Tab label="Pagamento" />
          <Tab label="Configuração" />
        </Tabs>

        {/* Aba 1: Item */}
        {value === 0 && (
          <Box>
            <Typography>Item</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Nome do Produto" fullWidth variant="outlined" />
                  )}
                />
                <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                  Nome do link de pagamentos
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Descrição do Produto" fullWidth variant="outlined" />
                  )}
                />
                <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                  Descrição do link de pagamentos
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Valor do Produto"
                      fullWidth
                      type="number"
                      variant="outlined"
                    />
                  )}
                />
                <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                  Valor do link de pagamentos, caso não informado o pagador poderá informar o quanto
                  deseja pagar
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ validate: validateEndDate }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        label="Data de Encerramento"
                        fullWidth
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }} // Garante que o label não sobreponha
                        error={!!errors.endDate}
                      />
                      {errors.endDate && (
                        <Typography
                          variant="caption"
                          style={{ color: "red", marginTop: "4px", display: "block" }}
                        >
                          {errors.endDate.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
                <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                  Data de encerramento
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Aba 2: Pagamento */}
        {value === 1 && (
          <Box>
            <Typography variant="h6">Pagamento</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Forma de Pagamento</InputLabel>
                  <Controller
                    name="billingType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Forma de Pagamento"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <MenuItem value="UNDEFINED">Indefinido</MenuItem>
                        <MenuItem value="BOLETO">Boleto</MenuItem>
                        <MenuItem value="CREDIT_CARD">Cartão de Crédito</MenuItem>
                        <MenuItem value="PIX">PIX</MenuItem>
                      </Select>
                    )}
                  />
                  <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                    Forma de pagamento permitida
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Forma de Cobrança</InputLabel>
                  <Controller
                    name="chargeType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Forma de Cobrança"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <MenuItem value="DETACHED">Desvinculado</MenuItem>
                        <MenuItem value="RECURRENT">Recorrente</MenuItem>
                        <MenuItem value="INSTALLMENT">Parcelado</MenuItem>
                      </Select>
                    )}
                  />
                  <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                    Forma de cobrança
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Controller
                  name="dueDateLimitDays"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantidade de dias úteis"
                      fullWidth
                      type="number"
                      variant="outlined"
                    />
                  )}
                />
                <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                  Quantidade de dias úteis que o seu cliente poderá pagar após o boleto ser gerado
                  (Para forma de pagamento como Boleto)
                </Typography>
              </Grid>
              {chargeType === "RECURRENT" && (
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Periodicidade da Cobrança</InputLabel>
                    <Controller
                      name="subscriptionCycle"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Periodicidade da Cobrança"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Object.entries(subscriptionCycleOptions).map(([key, label]) => (
                            <MenuItem key={key} value={key}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                      Periodicidade da cobrança, caso o chargeType seja RECURRENT
                    </Typography>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        {/* Aba 3: Configuração */}
        {value === 2 && (
          <Box>
            <Typography variant="h6">Configuração</Typography>
            <Grid container spacing={2} mt={2}>
              {chargeType === "INSTALLMENT" && (
                <Grid item xs={6}>
                  <Controller
                    name="maxInstallmentCount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Máximo de Parcelas"
                        fullWidth
                        type="number"
                        variant="outlined"
                      />
                    )}
                  />
                  <Typography variant="caption" style={{ fontWeight: 300, color: "gray" }}>
                    Quantidade máxima de parcelas que seu cliente poderá parcelar o valor do link de
                    pagamentos caso a forma de cobrança selecionado seja Parcelamento
                  </Typography>
                </Grid>
              )}
              <Grid item xs={8}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isAddressRequired"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Endereço Necessário"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="notificationEnabled"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Notificação Habilitada"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="autoRedirect"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Redirecionamento Automático"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Controller
                  name="successUrl"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="URL de Sucesso" fullWidth variant="outlined" />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6">Resumo</Typography>
          <Box mb={2}>
            <Typography variant="body1">
              <ShoppingCart sx={{ marginRight: 1 }} />
              Item: {productName || "N/A"}
            </Typography>
            <Typography variant="body1">
              <AttachMoney sx={{ marginRight: 1 }} />
              Valor: {formatCurrency(productValue)}
            </Typography>
            <Typography variant="body1">
              <Payment sx={{ marginRight: 1 }} />
              Forma de Pagamento: {paymentType || "N/A"}
            </Typography>
            <Typography variant="h6">
              <CheckCircle sx={{ marginRight: 1 }} />
              Total: {formatCurrency(productValue + freight)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleBack} disabled={value === 0} variant="outlined">
              Voltar
            </Button>
            {value === 2 ? (
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Processando..." : "Salvar"}
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained">
                Avançar
              </Button>
            )}
          </Box>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShopFormEdit;