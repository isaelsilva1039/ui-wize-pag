import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Paper, Link, InputAdornment } from '@mui/material';
import '../styles/login/login.scss';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url_api } from '../components/api/url';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import RegistrationWizard from '../components/Contratos/RegistrationWizard';
import { Image } from '@mui/icons-material';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Para o cadastro
    const [name, setName] = useState(''); // Para o cadastro
    const [lastName, setLastName] = useState(''); // Para o cadastro
    const [birthDate, setBirthDate] = useState(''); // Para o cadastro
    const [userType, setUserType] = useState(2); // Para o cadastro
    const [isRegistering, setIsRegistering] = useState(false); // Alterna entre Login e Cadastro
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);



      const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
      const [companyData, setCompanyData] = useState({
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        cnpj: "",
        socialReason: "",
      });


    const handleLogin = async () => {
        setLoading(true); // Ativa o loading
        try {
            const response = await axios.post(`${url_api}/api/auth/login`, {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                
              const { evolu_token, user } = response?.data;

              console.log(evolu_token)
              console.log(user)

                login(evolu_token, user);
              
                navigate('/pagamentos/links');
              
                toast.success("Login realizado com sucesso!");
            }
        } catch (error) {
            setShowError(true);
            toast.error("Erro ao fazer login. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

   // Função de Cadastro
   const handleRegister = async () => {
    if (password !== confirmPassword) {
        setShowError(true);
        toast.error("As senhas não coincidem!");
        return;
    }

    setLoading(true); // Ativa o loading
    try {
        const response = await axios.post(`${url_api}/api/auth/register`, {
            user: {
                name: userData?.name,
                email: userData?.email,
                password_confirmation: userData?.password,
            },
            company: {
                company_name: companyData?.companyName,
                company_email: companyData?.companyEmail,
                company_phone: companyData?.companyPhone,
                cnpj: companyData?.cnpj,
                social_reason: companyData?.socialReason,
            }
        });

        if (response.status === 200) {
            setIsRegistering(false);
            toast.success("Cadastro realizado com sucesso!");
        }
    } catch (error) {
        setShowError(true);


        const errorMessages = error.response?.data?.errors;
        
        if (errorMessages) {

            const translatedErrors = Object.keys(errorMessages).map((key) => {
                if (key === "user.email") {
                    return "O email do usuário já foi registrado.";
                }
                if (key === "company.cnpj") {
                    return "O CNPJ da empresa já está em uso.";
                }
                if (key === "company.company_email") {
                    return "O email da empresa já está em uso.";
                }
                return errorMessages[key][0];
            });

  
            translatedErrors.forEach((message) => toast.error(message));
        } else {
            toast.error("Erro ao realizar o cadastro. Tente novamente.");
        }
    } finally {
        setLoading(false);
    }
};


  const onSave = ()=>{
    handleRegister()
  }

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <Box className="login-container">
            <Paper className="login-paper">
                {/* Left Side (Illustration)
                <Box className="login-left">
                    <Box
                        component="img"
                        src="./rb_3180.png"
                        alt="Illustration"
                        className="login-illustration"
                    />
                </Box> */}

                {/* Right Side (Login / Register Form) */}
                <Box className="login-right">


                    {!isRegistering && (
                        <div className="welcome-container">
                            {!isRegistering && (
                                
                                <>
                                <img style={{height:'38px', width:'38px'}} src="image2.png" alt="Imagem" />

                                <div className="welcome-text">
                                    Bem-vindo
                                </div>
                                <span className="highlighted-text">WizePag</span>
                                {/* WizePag – "Wize" vem de sabedoria, significando um pagamento inteligente */}
                                </>
                            )}
                          
                        </div>
                    )}

  
                  {/* Exibe o formulário de login ou de cadastro */}
                    {isRegistering ? (
                      <RegistrationWizard
                        setCompanyData={setCompanyData}
                        setUserData={setUserData}
                        setIsRegistering={setIsRegistering}
                        onSave={onSave}
                        userData={userData}
                        companyData={companyData}
                      />
                    ) : (
                        <>
                          
                            <Box>
                            {/* <div className="login-prompt">Faça login</div> */}
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    onClick={handleLogin}
                                    variant="contained"
                                    className="login-button"
                                    fullWidth
                                    disabled={loading} // Desativa o botão enquanto carrega
                                >
                                    {loading ? 'Logando...' : 'Logar'}
                                </Button>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="subtitle2" align="center" sx={{ textTransform: 'none' }}>
                                    Não tem uma conta?{' '}
                                    <Link href="#" onClick={() => setIsRegistering(true)}>
                                        Cadastre-se
                                    </Link>
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
            {/* Container para as notificações */}
            <ToastContainer />
        </Box>
    );
};

export default Login;
