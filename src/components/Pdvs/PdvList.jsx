import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    CircularProgress,
} from "@mui/material";
import "../../styles/cardPdv/card-pdv.scss";
import { IoIosCloudDone } from "react-icons/io";
import { MdContentCopy, MdOutlineDesktopAccessDisabled, MdOutlineHourglassDisabled } from "react-icons/md";
import { TbScreenShare } from "react-icons/tb";
import { getPdvs } from "../../services/pdvService";


const statusColors = {
    gerado: "yellow",
    expirado: "orange",
    liberado: "blue",
    inativo: "red",
    Ativo: "green",
    "não está em uso": "orange",
};

const PdvList = ({ token , update}) => {

    const [pdvs, setPdvs] = useState([]);
    const [selectedPdv, setSelectedPdv] = useState(null);
    const [selectedToken, setSelectedToken] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10); // Quantidade de itens por página
    const [loading, setLoading] = useState(false);

    const fetchPdvs = async (page) => {
        setLoading(true);
        try {
            const response = await getPdvs(token, page, pageSize);
            setPdvs(response.data);
            setCurrentPage(response.page);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Erro ao carregar PDVs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPdvs(currentPage);
    }, [currentPage]);


    useEffect(() => {
        if(!update) return; 

        fetchPdvs(currentPage);
    }, [update]);

    

    const handleCardClick = (pdv) => {
        setSelectedPdv(pdv);
    };

    const handleClose = () => {
        setSelectedPdv(null);
        setSelectedToken("");
    };

    const handleTokenSelect = () => {
        console.log(`Token ${selectedToken} associado ao PDV ${selectedPdv.descricao}`);
        handleClose();
    };

    const handleCopy = (chavePDV) => {
        navigator.clipboard.writeText(chavePDV);
        console.log(`Chave ${chavePDV} copiada para a área de transferência!`);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchPdvs(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            fetchPdvs(currentPage - 1);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 2,
                    }}
                >
                    {pdvs.map((pdv) => (
                        <Card
                            className="card-pdv"
                            key={pdv.id}
                            sx={{ borderLeft: `3px solid ${statusColors[pdv.status] || "gray"}` }}
                            onClick={() => handleCardClick(pdv)}
                            style={{ cursor: "pointer" }}
                        >
                            <CardContent>
                                <Typography className="card-pdv__status" variant="h6" gutterBottom>
                                    {pdv.descricao}

                                    <Typography variant="body2" color="textSecondary">
                                        {pdv.status === "Ativo" ? (
                                            <Chip icon={<IoIosCloudDone />} label="Ativo" color="success" size="small" />
                                        ) : pdv.status === "liberado" ? (
                                            <Chip icon={<TbScreenShare />} label="Liberado para uso" color="info" size="small" />
                                        ) : pdv.status === "inativo" ? (
                                            <Chip icon={<MdOutlineDesktopAccessDisabled />} label="Inativo" color="error" size="small" />
                                        ) : pdv.status === "expirado" ? (
                                            <Chip icon={<MdOutlineHourglassDisabled />} label="Expirado" color="warning" size="small" />
                                        ) : (
                                            <Chip icon={<MdOutlineDesktopAccessDisabled />} label="Inativo" color="error" size="small" />
                                        )}
                                    </Typography>
                                </Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Filial: {pdv.filial?.nome_fantasia || "N/A"} ({pdv.filial?.descricao || "N/A"})
                                </Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Data de Criação: {pdv.data_criacao}
                                </Typography>

                                {pdv.status === "Ativo" && (
                                    <Typography variant="body2" color="textSecondary">
                                        Token Ativo até: {pdv.data_expiracao_token}
                                    </Typography>
                                )}

                                <Typography variant="body2" color="textSecondary">
                                    Criado por: {pdv.user?.name || "Desconhecido"}
                                </Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Chave do PDV:
                                    {pdv.token?.token_pdv ? (
                                        <>
                                            <Chip label={pdv.token.token_pdv} />
                                            <Tooltip title="Copiar Chave">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(pdv.token.token_pdv);
                                                    }}
                                                >
                                                    <MdContentCopy />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Chip label="***********" />
                                    )}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Paginação */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Página Anterior
                </Button>
                <Typography variant="body1">
                    Página {currentPage} de {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    Próxima Página
                </Button>
            </Box>

            {/* Modal de Seleção de Token */}
            {selectedPdv && (
                <Dialog open={Boolean(selectedPdv)} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Selecionar Token para {selectedPdv.descricao}</DialogTitle>
                    <DialogContent>
                        <Select
                            fullWidth
                            value={selectedToken}
                            onChange={(e) => setSelectedToken(e.target.value)}
                        >
                            {pdvs
                                .filter((token) => token.status !== "em uso")
                                .map((token) => (
                                    <MenuItem key={token.id} value={token.id}>
                                        {token.descricao} - {token.status}
                                    </MenuItem>
                                ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleTokenSelect} color="primary" disabled={!selectedToken}>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default PdvList;
