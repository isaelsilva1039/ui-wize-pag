import React, { useState } from "react";
import { Tabs, Tab, Box, TextField, Button, Typography } from "@mui/material";
import '../styles/contatos/conatos.scss'
import { CiCircleCheck } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
const Contratos = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <div className="container">
        <Box sx={{ width: "100%", p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Contratos
            </Typography>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Cadastro de Clientes" />
                <Tab label="Relatório de Clientes" />
            </Tabs>

            {tabIndex === 0 && (
                <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
                    <TextField size="small" fullWidth label="Nome" margin="normal" />
                    <TextField size="small" fullWidth label="CNPJ" margin="normal" />
                    <TextField size="small" fullWidth label="CPF" margin="normal" />
                    <TextField size="small" fullWidth label="Endereço" margin="normal" />
                    <TextField size="small" fullWidth label="PDV (Mono ou Multi)" margin="normal" />
                    <TextField size="small" fullWidth label="Ativo/Inativo" margin="normal" />
                    <TextField size="small" fullWidth label="Telefone" margin="normal" />
                    <TextField size="small" fullWidth label="WhatsApp" margin="normal" />
                    <TextField size="small" fullWidth label="Email" margin="normal" />
                    <TextField size="small" fullWidth label="Responsável" margin="normal" />

                    <Button variant="contained" className="container__btn-salvar" color="primary" sx={{ mt: 3 }}>
                        Cadastrar <FaCheckCircle size={18} color="white" />
                    </Button>
                </Box>
            )}

            {tabIndex === 1 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Relatório de contratos
                    </Typography>
                    <Typography>Em desenvolvimento...</Typography>
                    {/* Aqui você pode adicionar uma tabela para exibir os clientes */}
                </Box>
            )}
        </Box>
        </div>
    );
};

export default Contratos;
