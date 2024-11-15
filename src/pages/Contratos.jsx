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
import ClientTable from "../components/Contratos/ClientTable";
import '../styles/contatos/contratos.scss'
import { FaCheckCircle, FaUser } from "react-icons/fa";
import mockClientes from "../mocks/clientes";

const Contratos = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [clientes, setClientes] = useState(mockClientes);

    const [editCliente, setEditCliente] = useState(false);

    // Estado para o Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    // Abrir a Modal
    const handleOpen = () => {
        setOpen(true);
    };

    // Fechar a Modal
    const handleClose = () => {
        setOpen(false);
    };

    // Adicionar um novo cliente
    const addCliente = (cliente) => {
        setClientes((prevClientes) => [...prevClientes, cliente]);
        setSnackbarMessage("Cliente cadastrado com sucesso!");
        setSnackbarOpen(true);
    };

    // Atualizar um cliente existente
    const updateCliente = (index, updatedCliente) => {
        setClientes((prevClientes) => {
            const newClientes = [...prevClientes];
            newClientes[index] = updatedCliente;
            return newClientes;
        });
        setSnackbarMessage("Cliente atualizado com sucesso!");
        setSnackbarOpen(true);
    };

    // Remover um cliente
    const removeCliente = (index) => {
        setClientes((prevClientes) => prevClientes.filter((_, i) => i !== index));
        setSnackbarMessage("Cliente removido com sucesso!");
        setSnackbarOpen(true);
    };

    // Definição das colunas específicas para clientes
    const clientColumns = [
        { id: "id", label: "id", visible: true },
        { id: "nome", label: "Nome", visible: true },
        { id: "cnpj", label: "CNPJ", visible: true },
        { id: "cpf", label: "CPF", visible: true },
        { id: "endereco", label: "Endereço", visible: true },
        { id: "pdv", label: "PDV", visible: true },
        { id: "ativoInativo", label: "Status", visible: true },
        { id: "telefone", label: "Telefone", visible: true },
        { id: "whatsapp", label: "WhatsApp", visible: true },
        { id: "email", label: "Email", visible: true },
        { id: "responsavel", label: "Responsável", visible: true },
        { id: "actions", label: "Ações", visible: true },
    ];

    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
              
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Contratos" />

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
                                Adicionar Novo
                            </Button>
                        </Box>
                        <ClientTable
                            columns={clientColumns}
                            data={clientes}
                            onEdit={(item, index) => setEditCliente({ item, index })}
                            onDelete={removeCliente}
                        />
                    </Box>
                )}
            </Box>


            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Cadastro de Contrato</DialogTitle>
                <DialogContent>
                    <ClientForm onSubmit={addCliente} onClose={handleClose} />
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}  className="container__cancelar">
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



{editCliente && (
                <Dialog
                    open={Boolean(editCliente)}
                    onClose={() => setEditCliente(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogContent>
                        <ClientForm
                            onSubmit={(updatedCliente) => {
                                updateCliente(editCliente.index, updatedCliente);
                                setEditCliente(null);
                            }}
                            onClose={() => setEditCliente(null)}
                            initialData={editCliente.item}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditCliente(null)} className="container__cancelar" color="secondary">
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

export default Contratos;
