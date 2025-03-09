import React, { useContext, useState } from "react";
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
import axios from 'axios'; // Para fazer requisições HTTP
import { Payment, AttachMoney, LocalOffer, ShoppingCart, CheckCircle } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify'; // Importando a biblioteca de notificação
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo
import '../../styles/contatos/formulario-pagamentos.scss'
import { ProgressBar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const ShopForm = ({onUpdate}) => {
  const { control, handleSubmit, setValue, watch, reset } = useForm();
  const [value, setValueTab] = useState(0);
  const [freight, setFreight] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext  );

  const [item, setItem] = useState({
    name: "",
    description: "",
    value: 0,
    externalReference: "123",
    dueDateLimitDays: 3,
    cycle: "MONTHLY",
    maxInstallmentCount: 1,
    isAddressRequired: true,
    notificationEnabled: true,
    endDate: "2029-09-05",
    successUrl: "https://evolutto.com",
    autoRedirect: true,
    billingType: "UNDEFINED",
    chargeType: "DETACHED",   
    subscriptionCycle: "MONTHLY",
  });

  // Observando os valores em tempo real
  const productName = watch("name");
  const productValue = watch("value");
  const paymentType = watch("billingType");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const onSubmit = async (data) => {
    setLoading(true); // Ativa o carregamento

    console.log("aaa", data);

    if(value != 2) return;

    console.log("Dados do formulário", data);

    const payload = {
      billingType: data.billingType,
      chargeType: data.chargeType,
      name: data.name,
      description: data.description,
      endDate: data.endDate,
      value: data.value,
      dueDateLimitDays: data.dueDateLimitDays,
      externalReference: 24,
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

    try {
      const response = await axios.post(
        'http://localhost:8000/api/pagamentos/payment-link',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("Resposta da API", response);
      toast.success("Formulário enviado com sucesso!");
      reset();

    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
      toast.error("Erro ao enviar os dados. Tente novamente!");
    } finally {
      setLoading(false);

      /** APENAS PARA DA TEMPO DE APARECER AS NOTIFICAÇÃO */
      setTimeout(() => {
        onUpdate(); // Chama a função onUpdate após 1 segundo
      }, 1000); // 1000 milissegundos = 1 segundo
    }
  };

  const calculateSubtotal = () => {
    return item.value;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + Number(freight);
  };

  const chargeType = watch("chargeType"); // Usar watch para controlar dinamicamente os campos
  const billingType = watch("billingType"); // Para controlar o billingType

  const handleNext = () => {
    if (value < 2) {
      setValueTab(value + 1);
    }
  };

  const handleBack = () => {
    if (value > 0) {
      setValueTab(value - 1);
    }
  };

  const isLastTab = value === 2;

  // Mapear os valores de 'subscriptionCycle' para português
  const subscriptionCycleOptions = {
    WEEKLY: 'Semanal',
    BIWEEKLY: 'Quinzenal',
    MONTHLY: 'Mensal',
    BIMONTHLY: 'Bimestral',
    QUARTERLY: 'Trimestral',
    SEMIANNUALLY: 'Semestral',
    YEARLY: 'Anual'
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
                  defaultValue={item.name}
                  render={({ field }) => (
                    <TextField {...field} label="Nome do Produto" fullWidth variant="outlined" />
                  )}
                />
                <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Nome do link de pagamentos</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={item.description}
                  render={({ field }) => (
                    <TextField {...field} label="Descrição do Produto" fullWidth variant="outlined" />
                  )}
                />
                <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Descrição do link de pagamentos</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Controller
                  name="value"
                  control={control}
                  defaultValue={item.value}
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
                <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Valor do link de pagamentos, caso não informado o pagador poderá informar o quanto deseja pagar</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={item.endDate}
                  render={({ field }) => (
                    <TextField {...field} label="Data de Encerramento" fullWidth type="date" variant="outlined" />
                  )}
                />
                  <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Data de encerramento </Typography>

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
                    defaultValue={item.billingType}
                    render={({ field }) => (
                      <Select {...field} label="Forma de Pagamento">
                        <MenuItem value="UNDEFINED">Indefinido</MenuItem>
                        <MenuItem value="BOLETO">Boleto</MenuItem>
                        <MenuItem value="CREDIT_CARD">Cartão de Crédito</MenuItem>
                        <MenuItem value="PIX">PIX</MenuItem>
                      </Select>
                    )}
                  />
                      <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Forma de pagamento permitida </Typography>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Forma de Cobrança</InputLabel>
                  <Controller
                    name="chargeType"
                    control={control}
                    defaultValue={item.chargeType}
                    render={({ field }) => (
                      <Select {...field} label="Forma de Cobrança">
                        <MenuItem value="DETACHED">Desvinculado</MenuItem>
                        <MenuItem value="RECURRENT">Recorrente</MenuItem>
                        <MenuItem value="INSTALLMENT">Parcelado</MenuItem>
                      </Select>
                    )}
                  />
                      <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Forma de cobrança</Typography>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Controller
                  name="dueDateLimitDays"
                  control={control}
                  defaultValue={item.dueDateLimitDays}
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
                      <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Quantidade de dias úteis que o seu cliente poderá pagar após o boleto ser gerado (Para forma de pagamento como Boleto)</Typography>
                
              </Grid>

              {chargeType === "RECURRING" && (
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Periodicidade da Cobrança</InputLabel>
                    <Controller
                      name="subscriptionCycle"
                      control={control}
                      defaultValue={item.subscriptionCycle}
                      render={({ field }) => (
                        <Select {...field} label="Periodicidade">
                          <MenuItem value="WEEKLY">{subscriptionCycleOptions["WEEKLY"]}</MenuItem>
                          <MenuItem value="BIWEEKLY">{subscriptionCycleOptions["BIWEEKLY"]}</MenuItem>
                          <MenuItem value="MONTHLY">{subscriptionCycleOptions["MONTHLY"]}</MenuItem>
                          <MenuItem value="BIMONTHLY">{subscriptionCycleOptions["BIMONTHLY"]}</MenuItem>
                          <MenuItem value="QUARTERLY">{subscriptionCycleOptions["QUARTERLY"]}</MenuItem>
                          <MenuItem value="SEMIANNUALLY">{subscriptionCycleOptions["SEMIANNUALLY"]}</MenuItem>
                          <MenuItem value="YEARLY">{subscriptionCycleOptions["YEARLY"]}</MenuItem>
                        </Select>
                      )}
                    />
                      <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Periodicidade da cobrança, caso o chargeType seja RECURRENT </Typography>

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
                    defaultValue={item.maxInstallmentCount}
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

                    <Typography variant="caption" style={{fontWeight:300, color:'gray'}} > Quantidade máxima de parcelas que seu cliente poderá parcelar o valor do link de pagamentos caso a forma de cobrança selecionado seja Parcelamento. Caso não informado o valor padrão será de 1 parcela</Typography>

                </Grid>
              )}

              <Grid item xs={6}>
                {/* <FormControlLabel
                  control={
                    <Controller
                      name="notificationEnabled"
                      control={control}
                      defaultValue={item.notificationEnabled}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Notificação Habilitada"
                /> */}
              </Grid>

              <Grid item xs={8}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isAddressRequired"
                      control={control}
                      defaultValue={item.isAddressRequired}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Endereço Necessário"
                />

  <FormControlLabel
                  control={
                    <Controller
                      name="notificationEnabled"
                      control={control}
                      defaultValue={item.notificationEnabled}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Notificação Habilitada"
                />

  <FormControlLabel
                  control={
                    <Controller
                      name="autoRedirect"
                      control={control}
                      defaultValue={item.autoRedirect}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
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
                  defaultValue={item.successUrl}
                  render={({ field }) => (
                    <TextField {...field} label="URL de Sucesso" fullWidth variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <FormControlLabel
                  control={
                    <Controller
                      name="autoRedirect"
                      control={control}
                      defaultValue={item.autoRedirect}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Redirecionamento Automático"
                /> */}
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6">Resumo</Typography>
          <Box mb={2}>
            <Typography variant="body1">
              <ShoppingCart sx={{ marginRight: 1 }} />
              Item: {productName}
            </Typography>
            <Typography variant="body1">
              <AttachMoney sx={{ marginRight: 1 }} />
              Valor: {formatCurrency(productValue)}

            </Typography>
            <Typography variant="body1">
              <Payment sx={{ marginRight: 1 }} />
              Forma de Pagamento: {paymentType}
            </Typography>
            <Typography variant="h6">
              <CheckCircle sx={{ marginRight: 1 }} />
              Total: R$ {formatCurrency(productValue)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleBack} disabled={value === 0} variant="outlined">
              Voltar
            </Button>

            {value == 2 ? (
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Finalizar"}
              </Button>
            ) : (
              <Button onClick={handleNext} type="submit" variant="contained">
                {"Avançar"}
              </Button>
            )}
          </Box>
        </Box>
      </div>


        <ToastContainer />
    </>
  );
};

export default ShopForm;
