import React, { useContext, useEffect, useState } from "react";
import {
    Tabs,
    Tab,
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClientForm from "../components/Contratos/ClientForm";
import ClientTable from "../components/Contratos/ClientTable";
import "../styles/contatos/contratos.scss";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { createContrato, deleteContrato, getContratos, updateContrato } from "../services/contratoService";

const Usuarios = () => {
    const { token } = useContext(AuthContext);

    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [editCliente, setEditCliente] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para o spinner
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

    const fetchContratos = async () => {
        setLoading(true); // Ativa o spinner
        try {
            const contratos = await getContratos(token, currentPage, pageSize);
            setClientes(contratos?.data);
            setTotalPages(contratos?.total_pages || 1);
        } catch (error) {
            console.error("Erro ao carregar contratos:", error);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    useEffect(() => {
        fetchContratos();
    }, [currentPage, pageSize]);

    const addCliente = async (novoContrato) => {
        setLoading(true); // Ativa o spinner
        try {
            await createContrato(token, novoContrato);
            setSnackbarMessage("Contrato cadastrado com sucesso!");
            setSnackbarOpen(true);
            setOpen(false);
            fetchContratos(); // Atualiza os dados
        } catch (error) {
            console.error("Erro ao criar contrato:", error);
            setSnackbarMessage("Erro ao cadastrar contrato. Tente novamente.");
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleUpdateContrato = async (id, updatedContrato) => {
        setLoading(true); // Ativa o spinner
        try {
            await updateContrato(token, id, updatedContrato);
            setSnackbarMessage("Contrato atualizado com sucesso!");
            setSnackbarOpen(true);
            fetchContratos(); // Atualiza os dados
        } catch (error) {
            console.error("Erro ao atualizar contrato:", error);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleDeleteContrato = async (id) => {
        setLoading(true); // Ativa o spinner
        try {
            await deleteContrato(token, id);
            setSnackbarMessage("Contrato excluído com sucesso!");
            setSnackbarOpen(true);
            fetchContratos(); // Atualiza os dados
        } catch (error) {
            console.error("Erro ao excluir contrato:", error);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const clientColumns = [
        { id: "ID", label: "ID", visible: true },
        { id: "Nome", label: "Nome", visible: true },
        { id: "CNPJ", label: "CNPJ", visible: true },
        { id: "CPF", label: "CPF", visible: true },
        { id: "Endereco", label: "Endereço", visible: true },
        { id: "PDV", label: "PDV", visible: true },
        { id: "AtivoInativo", label: "Status", visible: true },
        { id: "Telefone", label: "Telefone", visible: true },
        { id: "Whatsapp", label: "WhatsApp", visible: true },
        { id: "Email", label: "Email", visible: true },
        { id: "Responsavel", label: "Responsável", visible: true },
        { id: "actions", label: "Ações", visible: true },
    ];

    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Contratos" />
                </Tabs>

                {loading ? ( // Mostra o spinner enquanto carrega os dados
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    tabIndex === 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6" gutterBottom></Typography>
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
                                onEdit={(item) => setEditCliente(item)}
                                onDelete={(id) => handleDeleteContrato(id)}
                            />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Página Anterior
                                </Button>
                                <Typography variant="body1">
                                    Página {currentPage} de {totalPages}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Próxima Página
                                </Button>
                            </Box>
                        </Box>
                    )
                )}
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Cadastro de Contrato</DialogTitle>
                <DialogContent>
                    <ClientForm onSubmit={addCliente} onClose={handleClose} />
                </DialogContent>
            </Dialog>

            {editCliente && (
                <Dialog
                    open={Boolean(editCliente)}
                    onClose={() => setEditCliente(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Editar Contrato</DialogTitle>
                    <DialogContent>
                        <ClientForm
                            onSubmit={(updatedContrato) => {
                                handleUpdateContrato(editCliente.ID, updatedContrato);
                                setEditCliente(null);
                            }}
                            onClose={() => setEditCliente(null)}
                            initialData={editCliente}
                        />
                    </DialogContent>
                </Dialog>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Usuarios;
