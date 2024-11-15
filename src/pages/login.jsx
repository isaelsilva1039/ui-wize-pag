import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper, Alert, Snackbar } from '@mui/material';
import '../styles/login/login.scss';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url_api } from '../components/api/url';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${url_api}/auth/login`, {
                username: email,
                password: password,
            });

            if (response.status === 200) {
                const { token ,user } = response.data;
                login(token ,user);
                navigate('/contratos');
            }
        } catch (error) {
            setShowError(true);
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
                        src="./image.png"
                        alt="Illustration"
                        className="login-illustration"
                    />
                </Box>

                {/* Right Side (Login Form) */}
                <Box className="login-right">

                <Snackbar
                    open={showError}
                    autoHideDuration={1900}
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        Usuário ou senha errada. Por favor, tente novamente.
                    </Alert>
                </Snackbar>


                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Box className="login-options">
                        <FormControlLabel
                            control={<Checkbox name="rememberMe" />}
                            label="Lembra-me"
                        />
                        <Link href="#" underline="hover">
                            Esqueceu a senha?
                        </Link>
                    </Box>

                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        className="login-button"
                        fullWidth
                    >
                        Logar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
