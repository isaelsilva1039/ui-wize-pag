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

    const handleLogin = async () => {
        setLoading(true); // Ativa o loading
        try {
            const response = await axios.post(`${url_api}/auth/login`, {
                username: email,
                password: password,
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                login(token, user);
                navigate('/contratos');
                toast.success("Login realizado com sucesso!"); // Notificação de sucesso
            }
        } catch (error) {
            setShowError(true);
            toast.error("Erro ao fazer login. Tente novamente."); // Notificação de erro
        } finally {
            setLoading(false); // Desativa o loading
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setShowError(true);
            toast.error("As senhas não coincidem!"); // Notificação de erro
            return;
        }

        setLoading(true); // Ativa o loading
        try {
            const response = await axios.post(`${url_api}/auth/register`, {
                name: name,
                username: email, // Define o username como o email
                password: password,
                type: userType,
                email: email,
                birth_date: birthDate,
                last_name: lastName,
            });

            if (response.status === 200) {
                setIsRegistering(false);
                toast.success("Cadastro realizado com sucesso!");
            }
        } catch (error) {
            setShowError(true);
            toast.error("Erro ao realizar o cadastro. Tente novamente."); // Notificação de erro
        } finally {
            setLoading(false); // Desativa o loading
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <Box className="login-container">
            <Paper className="login-paper">
                {/* Left Side (Illustration) */}
                <Box className="login-left">
                    <Box
                        component="img"
                        src="./rb_3180.png"
                        alt="Illustration"
                        className="login-illustration"
                    />
                </Box>

                {/* Right Side (Login / Register Form) */}
                <Box className="login-right">


                    {!isRegistering && (
                        <div className="welcome-container">
                            {!isRegistering && (
                                
                                <>
                                <div className="welcome-text">
                                    Bem-vindo
                                </div>
                                <span className="highlighted-text">WORK parceiros</span>
                                </>
                            )}
                          
                        </div>
                    )}



                    {/* 
                    <Typography variant="h4" gutterBottom>
                        {isRegistering ? 'Cadastrar' : 'Login'}
                    </Typography> */}



                    {/* Exibe o formulário de login ou de cadastro */}
                    {isRegistering ? (
                        <>


<TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Sobrenome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
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
        label="Senha"
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
      <TextField
        label="Confirmar Senha"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Data de Nascimento"
        variant="outlined"
        type="date"
        fullWidth
        margin="normal"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />
                            <Button
                                onClick={handleRegister}
                                variant="contained"
                                className="login-button"
                                fullWidth
                                disabled={loading} // Desativa o botão enquanto carrega
                            >
                                {loading ? 'Cadastrando...' : 'Criar Conta'}
                            </Button>
                            <Box mt={2}>
                                <Typography variant="subtitle2" align="center" sx={{ textTransform: 'none' }}>
                                    Já tem uma conta?{' '}
                                    <Link href="#" onClick={() => setIsRegistering(false)}>
                                        Faça login
                                    </Link>
                                </Typography>
                            </Box>
                        </>
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
