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
    Card,
    CardContent,
    CardActions,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { MdPerson, MdBusiness, MdHome, MdStore, MdCheckCircle, MdPhone, MdWhatsapp, MdEmail, MdPersonOutline } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { createContrato, deleteContrato, getContratos, updateContrato } from "../services/contratoService";
import ClientForm from "../components/Contratos/ClientForm";
import ClientTable from "../components/Contratos/ClientTable";
import "../styles/contatos/contratos.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ShopForm from "../components/Contratos/ShopForm";
import axios from 'axios'; // Para fazer requisições HTTP
import { Payment } from "@mui/icons-material";

const LinksPagamentos = () => {
    const location = useLocation();
    const { token } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width:768px)');


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


    const onUpdate = () => {
        fetchLinksPagamentos()
        setOpen(false)
    }

    const fetchLinksPagamentos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/pagamentos/payment-link?page=${currentPage}&per_page=${pageSize}&include_empresa=true`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            
            setClientes(response.data.data.links);
            setTotalPages(response.data.data.meta.total_pages);
        } catch (error) {
            console.error("Erro ao carregar links de pagamento:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinksPagamentos();
    }, [currentPage, pageSize]);

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

    const handleUpdateContrato = async (id, updatedContrato) => {
        setLoading(true);
        try {
            await updateContrato(token, id, updatedContrato);
            setSnackbarMessage("Contrato atualizado com sucesso!");
            setSnackbarOpen(true);
    
        } catch (error) {
            console.error("Erro ao atualizar contrato:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContrato = async (id) => {
        setLoading(true);
        try {
            await deleteContrato(token, id);
            setSnackbarMessage("Contrato excluído com sucesso!");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Erro ao excluir contrato:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (url) => {
        if (url) {
            navigator.clipboard.writeText(url);
            setSnackbarMessage("Link copiado com sucesso!");
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage("Link não disponível.");
            setSnackbarOpen(true);
        }
    };


    const clientColumns = [
        { id: "id", label: "ID", visible: true },
        { id: "name", label: "Nome", visible: true },
        { id: "billingType", label: "Forma de Pagamento", visible: true },
        { id: "chargeType", label: "Tipo assinatura", visible: true },
        { id: "value", label: "Valor", visible: true },
        { id: "subscriptionCycle", label: "Ciclo de Assinatura", visible: true },
        { id: "endDate", label: "Data de Encerramento", visible: true },
        { id: "active", label: "Status", visible: true },
        { id: "actions", label: "Ações", visible: true },
    ];

    

    return (
        <div className="container-master">
              <div className="titulo-page">
               <Typography className="bracap-pages"> {location.pathname === "/" ? "Links de Pagamento" : location.pathname.replace("/", "")} </Typography>
               <Typography className="titulo-pagina"> Pagamentos </Typography>
             </div> 
            
            <div className="container-contratos">

          
                <Box sx={{ width: "100%", p: 3 }}>
                    {/* <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Contratos" />
                    </Tabs> */}

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
                                        className="botao-p"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpen}
                                        startIcon={<Payment />}
                                    >
                                        Criar novo link
                                    </Button>
                                </Box>
                                {isMobile ? (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                        {clientes.map((link) => (
                                            <Card key={link.id} sx={{ borderLeft: '4px solid #1b78d5', flex: '1 1 45%' }}>
                                                <CardContent>
                                                    <Typography variant="h6">{link.name}</Typography>
                                                    <Typography><MdBusiness style={{ color: 'gray', marginRight: 8 }} />{link.billingType}</Typography>
                                                    <Typography><MdPersonOutline style={{ color: 'gray', marginRight: 8 }} />{link.chargeType}</Typography>
                                                    <Typography><MdHome style={{ color: 'gray', marginRight: 8 }} />{link.subscriptionCycle}</Typography>
                                                    <Typography><MdStore style={{ color: 'gray', marginRight: 8 }} />{link.value}</Typography>
                                                    <Typography><MdCheckCircle style={{ color: 'gray', marginRight: 8 }} />{link.status ? "Ativo" : "Inativo"}</Typography>
                                                    <Typography><MdPhone style={{ color: 'gray', marginRight: 8 }} />{link.endDate}</Typography>
                                                    <Typography><MdWhatsapp style={{ color: 'gray', marginRight: 8 }} />{link.url}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => setEditCliente(link)}
                                                    >
                                                        <FaEdit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => handleDeleteContrato(link.id)}
                                                    >
                                                        <FaTrash />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        ))}
                                    </Box>
                                ) : (
                                    <ClientTable
                                        columns={clientColumns}
                                        data={clientes}
                                        onEdit={(item) => setEditCliente(item)}
                                        copyToClipboard={(item) => copyToClipboard(item)}
                                        onDelete={(id) => handleDeleteContrato(id)}
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

                <Dialog className="modal-criar-link" open={open} onClose={handleClose} fullWidth maxWidth="lg">
                    <DialogTitle>Cadastro de Link de Pagamento</DialogTitle>
                    <DialogContent>
                        <ShopForm onUpdate={onUpdate} />
                    </DialogContent>
                </Dialog>

                {editCliente && (
                    <Dialog
                        open={Boolean(editCliente)}
                        onClose={() => setEditCliente(null)}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle>Editar Link de Pagamento</DialogTitle>
                        <DialogContent>
                            <ClientForm
                                onSubmit={(updatedContrato) => {
                                    handleUpdateContrato(editCliente.id, updatedContrato);
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
        </div>
    );
};

export default LinksPagamentos;
