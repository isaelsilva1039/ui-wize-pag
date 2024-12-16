import React, { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import "../styles/contatos/contratos.scss";
import { FaUser } from "react-icons/fa";

import EmpresaTable from "../components/Empresa/EmpresaTable";
import EmpresaForm from "../components/Empresa/EmpresaForm";
import { getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } from "../services/empresaService";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify"; // Import do toast

const Empresa = () => {
    const { token } = useContext(AuthContext);

    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [editEmpresa, setEditEmpresa] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchEmpresas = async (page = 1) => {
        setLoading(true); 
        try {
            const response = await getEmpresas(token, page, pageSize);
            setEmpresas(response.data);
            setCurrentPage(response.page);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Erro ao carregar empresas:", error);
        } finally {
            setLoading(false);
        }
    };

    const addEmpresa = async (novaEmpresa) => {
        setLoading(true); 
        try {
            await createEmpresa(token, novaEmpresa);
            toast.success("Empresa cadastrada com sucesso!");
            setSnackbarOpen(true);
            setOpen(false);
            fetchEmpresas(currentPage); 
        } catch (error) {
            console.error("Erro ao criar empresa:", error?.response?.data?.error);
            toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmpresa = async (id, updatedEmpresa) => {
        setLoading(true);
        try {
            await updateEmpresa(token, id, updatedEmpresa);
            toast.success("Empresa atualizada com sucesso!");
            fetchEmpresas(currentPage);
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            toast.error("Erro ao atualizar empresa. Tente novamente.");
        } finally {
            setLoading(false); 
        }
    };

    const handleDeleteEmpresa = async (empresa) => {
        setLoading(true); 
        try {
            await deleteEmpresa(token, empresa?.id , empresa?.deleted_at);
            toast.success("Empresa removida com sucesso!");
            fetchEmpresas(currentPage);
        } catch (error) {
            console.error("Erro ao excluir empresa:", error);
            setSnackbarMessage("Erro ao excluir empresa. Tente novamente.");
            toast.error("Erro ao excluir empresa. Tente novamente.");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchEmpresas(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            fetchEmpresas(currentPage - 1);
        }
    };

    const empresaColumns = [
        { id: "id", label: "ID", visible: true },
        { id: "descricao", label: "Descrição", visible: true },
        { id: "razao_social", label: "Razão Social", visible: true },
        { id: "nome_fantasia", label: "Nome Fantasia", visible: true },
        { id: "endereco", label: "Endereço", visible: true },
        { id: "cnpj", label: "CNPJ", visible: true },
        { id: "actions", label: "Ações", visible: true },
    ];

    useEffect(() => {
        fetchEmpresas(); 
    }, []);

    

    return (
        <div className="container">
            <ToastContainer />

            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Empresas" />
                </Tabs>

                {loading ? (
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
                                    Nova Empresa
                                </Button>
                            </Box>
                            <EmpresaTable
                                columns={empresaColumns}
                                data={empresas}
                                onEdit={(item) => setEditEmpresa(item)}
                                onDelete={(empresa) => handleDeleteEmpresa(empresa)}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 2,
                                }}
                            >
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
                <DialogTitle>Cadastro de Empresa</DialogTitle>
                <DialogContent>
                    <EmpresaForm onSubmit={addEmpresa} onClose={handleClose} />
                </DialogContent>
            </Dialog>

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
                            onSubmit={(updatedEmpresa) => {
                                handleUpdateEmpresa(editEmpresa.id, updatedEmpresa);
                                setEditEmpresa(null);
                            }}
                            onClose={() => setEditEmpresa(null)}
                            initialData={editEmpresa}
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

export default Empresa;
