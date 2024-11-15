// src/components/PdvList.jsx

import React, { useState } from "react";
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
} from "@mui/material";
import mockPDVs from "../../mocks/pdv";
import mockTokens from "../../mocks/tokeks";
import '../../styles/cardPdv/card-pdv.scss'
import { IoIosCloudDone } from "react-icons/io";
import { MdContentCopy, MdOutlineDesktopAccessDisabled, MdOutlineHourglassDisabled } from "react-icons/md";
import { orange } from "@mui/material/colors";

const statusColors = {
    gerado: "yellow",
    expirado: "orange",
    liberado: "blue",
    inativo: "red",
    ativo: "green",
    "não está em uso": "orange",
};

const PdvList = () => {
    const [selectedPdv, setSelectedPdv] = useState(null);
    const [selectedToken, setSelectedToken] = useState("");

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

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
                p: 2,
            }}
        >
            {mockPDVs.map((pdv) => (
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
                                {pdv.status === "ativo" ? (
                                    <Chip icon={<IoIosCloudDone />} label="Ativo" color="success" size="small" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }} />
                                ) : pdv.status === "liberado" ? (
                                    <Chip label="Liberado para uso" style={{ backgroundColor: statusColors[pdv.status], color: "white" }} size="small" />
                                ) : pdv.status === "inativo" ? (
                                    <Chip icon={<MdOutlineDesktopAccessDisabled />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }} label="Inativo" color="error" size="small" />
                                ) : pdv.status === "expirado" ? (
                                    <Chip icon={<MdOutlineHourglassDisabled />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }} label="Expirado" color="warning" size="small" />
                                ) : (
                                    <Chip icon={<MdOutlineDesktopAccessDisabled />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }} label="Inativo" color="error" size="small" />
                                )}
                            </Typography>
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            Filial: {pdv.filial.nomeFantasia} ({pdv.filial.descricao})
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            Data de Criação: {pdv.dataCriacao}
                        </Typography>

                        {pdv.status === "ativo" && (
                            <Typography variant="body2" color="textSecondary">
                                Token Ativo até: {pdv.dataExpiracaoToken}
                            </Typography>
                        )}


                        <Typography variant="body2" color="textSecondary">
                            Criado por: {pdv.userCriacao}
                        </Typography>


                        {/* {pdv.status === "liberado" && pdv.chavePDV && ( */}
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}
                        >
                            Chave do PDV:
                            {pdv.status === "liberado" ? (
                                <>
                                    <Chip label={pdv.chavePDV} />
                                    <Tooltip title="Copiar Chave">
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(pdv?.chavePDV);
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

            {selectedPdv && (
                <Dialog open={Boolean(selectedPdv)} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Selecionar Token para {selectedPdv.descricao}</DialogTitle>
                    <DialogContent>
                        <Select
                            fullWidth
                            value={selectedToken}
                            onChange={(e) => setSelectedToken(e.target.value)}
                        >
                            {mockTokens
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
                        <Button
                            onClick={handleTokenSelect}
                            color="primary"
                            disabled={!selectedToken}
                        >
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default PdvList;
