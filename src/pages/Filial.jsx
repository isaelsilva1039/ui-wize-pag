import React, { useContext, useState, useEffect } from "react";
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
    Card,
    CardContent,
    CardActions,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { MdBusiness, MdHome, MdStore, MdCheckCircle, MdPhone, MdEmail } from "react-icons/md";
import "../styles/contatos/contratos.scss";
import FilialTable from "../components/FIlial/FilialTable";
import FilialForm from "../components/FIlial/FilialForm";
import { getFiliais, createFilial, updateFilial, deleteFilial } from "../services/filialService";
import { AuthContext } from "../context/AuthContext";

const Filial = () => {
    const { token } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width:768px)');

    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [filiais, setFiliais] = useState([]);
    const [editFilial, setEditFilial] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Estado para tipo de mensagem

    // Estados de paginação
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

    const fetchFiliais = async (page = 1) => {
        setLoading(true); // Ativa o spinner
        try {
            const response = await getFiliais(token, page, pageSize);
            setFiliais(response.data);
            setCurrentPage(response.page);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Erro ao carregar filiais:", error);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const addFilial = async (novaFilial) => {
        setLoading(true); // Ativa o spinner
        try {
            await createFilial(token, novaFilial);
            setSnackbarMessage("Filial cadastrada com sucesso!");
            setSnackbarOpen(true);
            setOpen(false);
            fetchFiliais(currentPage); // Atualiza os dados
            setSnackbarSeverity("success"); // Define o alerta como sucesso
        } catch (error) {
            console.error("Erro ao criar filial:", error);
            setSnackbarMessage("Erro ao cadastrar filial. Tente novamente.");
            setSnackbarSeverity("error"); // Define o alerta como erro
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleUpdateFilial = async (id, updatedFilial) => {
        setLoading(true); // Ativa o spinner
        try {
            await updateFilial(token, id, updatedFilial);
            setSnackbarSeverity("success"); // Define o alerta como sucesso
            setSnackbarMessage("Filial atualizada com sucesso!");
            setSnackbarOpen(true);
            fetchFiliais(currentPage); // Atualiza os dados
        } catch (error) {
            console.error("Erro ao atualizar filial:", error);
            setSnackbarMessage("Erro ao atualizar filial. Tente novamente.");
            setSnackbarSeverity("error"); // Define o alerta como erro
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleDeleteFilial = async (id) => {
        setLoading(true); // Ativa o spinner
        try {
            await deleteFilial(token, id);
            setSnackbarMessage("Filial removida com sucesso!");
            setSnackbarSeverity("success"); // Define o alerta como sucesso
            setSnackbarOpen(true);
            fetchFiliais(currentPage); // Atualiza os dados
        } catch (error) {
            console.error("Erro ao excluir filial:", error);
            setSnackbarMessage("Erro ao excluir filial. Tente novamente.");
            setSnackbarSeverity("error"); // Define o alerta como erro
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchFiliais(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            fetchFiliais(currentPage - 1);
        }
    };

    const filialColumns = [
        { id: "id", label: "ID", visible: true },
        { id: "descricao", label: "Filial", visible: true },
        { id: "nome_fantasia", label: "Empresa", visible: true },
        { id: "endereco", label: "Endereço", visible: true },
        { id: "cnpj", label: "CNPJ", visible: true },
        { id: "inscricao_estadual", label: "I.C.S", visible: true },
        { id: "actions", label: "Ações", visible: true },
    ];

    const processedFiliais = filiais.map((filial) => ({
        ...filial,
        nome_fantasia: filial.empresa?.nome_fantasia || "N/A",
    }));

    useEffect(() => {
        fetchFiliais(); // Carrega os dados na montagem do componente
    }, []);

    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Filiais" />
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
                                    Nova Filial
                                </Button>
                            </Box>
                            {isMobile ? (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                    {processedFiliais.map((filial) => (
                                        <Card key={filial.id} sx={{ borderLeft: '4px solid #1b78d5', flex: '1 1 45%' }}>
                                            <CardContent>
                                                <Typography variant="h6"><MdBusiness style={{ color: 'gray', marginRight: 8 }} />{filial.descricao}</Typography>
                                                <Typography><MdBusiness style={{ color: 'gray', marginRight: 8 }} />{filial.nome_fantasia}</Typography>
                                                <Typography><MdHome style={{ color: 'gray', marginRight: 8 }} />{filial.endereco}</Typography>
                                                <Typography><MdStore style={{ color: 'gray', marginRight: 8 }} />{filial.cnpj}</Typography>
                                                <Typography><MdCheckCircle style={{ color: 'gray', marginRight: 8 }} />{filial.inscricao_estadual}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => setEditFilial(filial)}
                                                >
                                                    <FaEdit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDeleteFilial(filial.id)}
                                                >
                                                    <FaTrash color="red" />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    ))}
                                </Box>
                            ) : (
                                <FilialTable
                                    columns={filialColumns}
                                    data={processedFiliais}
                                    onEdit={(item) => setEditFilial(item)}
                                    onDelete={(filial) => handleDeleteFilial(filial.id)}
                                />
                            )}

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
                <DialogTitle>Cadastro de Filial</DialogTitle>
                <DialogContent>
                    <FilialForm onSubmit={addFilial} onClose={handleClose} />
                </DialogContent>
            </Dialog>

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
                                handleUpdateFilial(editFilial.id, updatedFilial);
                                setEditFilial(null);
                            }}
                            onClose={() => setEditFilial(null)}
                            initialData={editFilial}
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
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Filial;
