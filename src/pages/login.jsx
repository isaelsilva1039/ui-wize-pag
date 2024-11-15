import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper } from '@mui/material';
import '../styles/login/login.scss';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {


    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
      const mockedData = {
        email: 'isael',
        password: '123',
        token: 'mocked-token-123',
      };
  
      if (email === mockedData.email && password === mockedData.password) {
        login(mockedData.token);

        navigate('/contratos');
      } else {
        alert('Invalid credentials!');
      }
    };
  

  return (
    <Box className="login-container">
      <Paper className="login-paper">
        {/* Left Side (Illustration) */}
        <Box className="login-left">
          <Box
            component="img"
            src="./image.png" // Replace with your illustration source
            alt="Illustration"
            className="login-illustration"
          />
        </Box>

        {/* Right Side (Login Form) */}
        <Box className="login-right">
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
          variant="contained" className="login-button" fullWidth>
            Logar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
