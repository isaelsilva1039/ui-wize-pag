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

import '../styles/contatos/contratos.scss'
import { FaCheckCircle, FaUser } from "react-icons/fa";

import FilialTable from "../components/FIlial/FilialTable";
import mockFiliais from "../mocks/mockFiliais";
import FilialForm from "../components/FIlial/FilialForm";

const Filial = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [filiais, setFiliais] = useState(mockFiliais);

    const [editFilial, setEditFilial] = useState(false);

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


    const addFilial = (filial) => {
        setFiliais((prevFiliais) => [...prevFiliais, filial]);
        setSnackbarMessage("Filial cadastrada com sucesso!");
        setSnackbarOpen(true);
    };


    const updateFilial = (index, updatedFilial) => {
        setFiliais((prevFiliais) => {
            const newFiliais = [...prevFiliais];
            newFiliais[index] = updatedFilial;
            return newFiliais;
        });
        setSnackbarMessage("Filial atualizada com sucesso!");
        setSnackbarOpen(true);
    };

    const removerFilial = (index) => {
        setFiliais((prevFiliais) => prevFiliais.filter((_, i) => i !== index));
        setSnackbarMessage("Filial removida com sucesso!");
        setSnackbarOpen(true);
    };

    const filialColumns = [
        { id: "id", label: "ID", visible: true },
        { id: "descricao", label: "Descrição", visible: true },
        { id: "razaoSocial", label: "Razão Social", visible: true },
        { id: "nomeFantasia", label: "Nome Fantasia", visible: true },
        { id: "endereco", label: "Endereço", visible: true },
        { id: "actions", label: "Ações", visible: true }, // Coluna para ações, sempre visível
    ];

    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Filial" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6" gutterBottom></Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                startIcon={<FaUser />}
                            >
                                Nova Filial
                            </Button>
                        </Box>
                        <FilialTable
                            columns={filialColumns}
                            data={filiais}
                            onEdit={(item, index) => setEditFilial({ item, index })}
                            onDelete={removerFilial}
                        />
                    </Box>
                )}
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Cadastro de Filial</DialogTitle>
                <DialogContent>
                    <FilialForm onSubmit={addFilial} onClose={handleClose} />
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

            {/* Modal para Edição de Filial */}
            {editFilial && (
                <Dialog
                    open={Boolean(editFilial)}
                    onClose={() => setEditFilial(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Editar Filial</DialogTitle>
                    <DialogContent>
                        <FilialForm
                            onSubmit={(updatedFilial) => {
                                updateFilial(editFilial.index, updatedFilial);
                                setEditFilial(null);
                            }}
                            onClose={() => setEditFilial(null)}
                            initialData={editFilial.item}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditFilial(null)} className="container__cancelar" color="secondary">
                            Cancelar
                        </Button>
                        <Button
                            className="container__btn-salvar"
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<CheckCircleIcon />}
                            form="filial-form"
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

export default Filial;