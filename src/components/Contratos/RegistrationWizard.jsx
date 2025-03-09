import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  useTheme,
  styled,
  InputAdornment,
  Link,
} from "@mui/material";
import { AccountCircle, Business, Phone, Email, BusinessCenter, Close, Lock } from "@mui/icons-material";

const RegistrationWizard = ({
  setCompanyData,
  setUserData,
  setIsRegistering,
  onSave,
  userData,
  companyData
}) => {

  console.log(setIsRegistering)
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Usuário", "Empresa"];
  const icons = [<AccountCircle />, <Business />];

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate user data before moving to the next step
      if (userData?.password !== userData?.passwordConfirmation) {
        alert("As senhas não coincidem!");
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    onSave()
    // Here you would send the data to your API or handle it as necessary
    console.log("User Data:", userData);
    console.log("Company Data:", companyData);
    // alert("Registro completo!");
  };

  return (
    <>
      <Box>
        <Box className="titulo-registro">
          <Typography variant="h5">Cadastro</Typography>
          <Typography variant="caption">Usuário/Empresa</Typography>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />} className="stepper">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel icon={icons[index]} className={activeStep === index ? "active-step" : ""}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form className="form-registration">
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6">Dados do Usuário</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nome"
                    fullWidth
                    value={userData?.name}
                    name="name"
                    onChange={handleUserChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={userData?.email}
                    name="email"
                    onChange={handleUserChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    value={userData?.password}
                    name="password"
                    onChange={handleUserChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Confirmar Senha"
                    type="password"
                    fullWidth
                    value={userData?.passwordConfirmation}
                    name="passwordConfirmation"
                    onChange={handleUserChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6">Dados da Empresa</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nome da Empresa"
                    fullWidth
                    value={companyData?.companyName}
                    name="companyName"
                    onChange={handleCompanyChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email da Empresa"
                    fullWidth
                    value={companyData?.companyEmail}
                    name="companyEmail"
                    onChange={handleCompanyChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Telefone da Empresa"
                    fullWidth
                    value={companyData?.companyPhone}
                    name="companyPhone"
                    onChange={handleCompanyChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CNPJ"
                    fullWidth
                    value={companyData?.cnpj}
                    name="cnpj"
                    onChange={handleCompanyChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessCenter />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Razão Social"
                    fullWidth
                    value={companyData?.socialReason}
                    name="socialReason"
                    onChange={handleCompanyChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessCenter />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

        <Box mt={2}>
        {/* Exibe o botão "Voltar" somente quando não estiver no primeiro passo */}
        {activeStep > 0 && (
            <Button className="voltar-btn" onClick={handleBack} variant="outlined" style={{ marginRight: "10px" }}>
            Voltar
            </Button>
        )}
        {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} variant="contained">
            Finalizar
            </Button>
        ) : (
            <Button onClick={handleNext} variant="contained">
            Avançar
            </Button>
        )}
        </Box>


          <Box mt={2}>
            <Typography variant="subtitle2" align="center" sx={{ textTransform: 'none' }}>
              Já tem conta?{' '}
              <Link href="#" onClick={() => setIsRegistering(false)}>
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
};

// Custom connector to add styling between steps
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  line: {
    borderColor: "#d3d3d3",
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

export default RegistrationWizard;
