// src/components/Contratos/Contratos.jsx

import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Importação do ícone do MUI
import ClientForm from "../components/Contratos/ClientForm";
import '../styles/contatos/contratos.scss'
import { FaCheckCircle, FaUser } from "react-icons/fa";

import EmpresaTable from "../components/Empresa/EmpresaTable";
import EmpresaForm from "../components/Empresa/EmpresaForm";
import mockEmpresas from "../mocks/empresa";

const Empresa = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [empresa, setEmpresa] = useState(mockEmpresas);

    const [editEmpresa, setEditEmpresa] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const addEmpresa = (cliente) => {
        setEmpresa((prevClientes) => [...prevClientes, cliente]);
        setSnackbarMessage("Cliente cadastrado com sucesso!");
        setSnackbarOpen(true);
    };


    const updateEmpresa = (index, updatedCliente) => {
        setEmpresa((prevClientes) => {
            const newClientes = [...prevClientes];
            newClientes[index] = updatedCliente;
            return newClientes;
        });
        setSnackbarMessage("Cliente atualizado com sucesso!");
        setSnackbarOpen(true);
    };

    const removerEmpresa = (index) => {
        setEmpresa((prevClientes) => prevClientes.filter((_, i) => i !== index));
        setSnackbarMessage("Empresa removido com sucesso!");
        setSnackbarOpen(true);
    };

    const empresaColluns = [
        { id: "id", label: "id", visible: true },
        { id: "descricao", label: "Descrição", visible: true },
        { id: "razaoSocial", label: "Razão Social", visible: true },
        { id: "nomeFantasia", label: "Nome Fantasia", visible: true },
        { id: "endereco", label: "Endereço", visible: true },
        { id: "actions", label: "Ações", visible: true }, // Coluna para ações, sempre visível
    ];

    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                {/* <Typography variant="h4" gutterBottom>
                    Contratos
                </Typography> */}
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Empresa" />

                </Tabs>

                {tabIndex === 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6" gutterBottom>

                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                startIcon={<FaUser />}
                            >
                                Nova Empresa
                            </Button>
                        </Box>
                        <EmpresaTable
                            columns={empresaColluns}
                            data={empresa}
                            onEdit={(item, index) => setEditEmpresa({ item, index })}
                            onDelete={removerEmpresa}
                        />
                    </Box>
                )}
            </Box>


            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Cadastro de Empresa</DialogTitle>
                <DialogContent>
                    <EmpresaForm onSubmit={addEmpresa} onClose={handleClose} />
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} className="container__cancelar">
                        Cancelar
                    </Button>

                    <Button
                        className="container__btn-salvar"
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<FaCheckCircle size={18} color="white" />}
                    >
                        Cadastrar
                    </Button>

                </DialogActions>
            </Dialog>


            {/* Modal para Edição de Cliente */}
            {editEmpresa && (
                <Dialog
                    open={Boolean(editEmpresa)}
                    onClose={() => setEditEmpresa(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Editar Empresa</DialogTitle>
                    <DialogContent>
                        <EmpresaForm
                            onSubmit={(updatedCliente) => {
                                updateEmpresa(editEmpresa.index, updatedCliente);
                                setEditEmpresa(null);
                            }}
                            onClose={() => setEditEmpresa(null)}
                            initialData={editEmpresa.item}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditEmpresa(null)} className="container__cancelar" color="secondary">
                            Cancelar
                        </Button>
                        <Button
                            className="container__btn-salvar"
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<CheckCircleIcon />}
                            form="client-form"
                        >
                            Atualizar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}



            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Empresa;
