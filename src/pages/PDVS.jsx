import React, { useContext, useState } from "react";
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
import { FaCheckCircle, FaPhotoVideo, FaUser } from "react-icons/fa";

import FilialTable from "../components/FIlial/FilialTable";
import mockFiliais from "../mocks/mockFiliais";
import FilialForm from "../components/FIlial/FilialForm";
import PdvList from "../components/Pdvs/PdvList";
import { SlScreenDesktop } from "react-icons/sl";
import TokenList from "../components/Pdvs/token-lista";
import { BsCreditCard2BackFill } from "react-icons/bs";
import PdvForm from "../components/Pdvs/PdvForm";
import { AuthContext } from "../context/AuthContext";
import { createPdv } from "../services/pdvService";

const PDVS = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const { token } = useContext(AuthContext);
    const [update, setUpdate] = useState(false);

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

    const handleFormSubmit = async (formData) => {

        setUpdate(false)
        
        try {
            const pdvData = {
                descricao: formData.descricao,
                status: "Ativo", // Define como ativo por padrão
                filial_id: formData.filialId,
                contrato_id: formData.contratoId,
                token_id: formData.tokenId,
                data_ativacao_token: formData.dataAtivacaoToken || null,
                data_expiracao_token: formData.dataExpiracaoToken || null,
            };

            const response = await createPdv(token, pdvData);
           
            setUpdate(true)
        

            // Fechar modal e mostrar mensagem de sucesso
            setSnackbarMessage("PDV cadastrado com sucesso!");
            setSnackbarOpen(true);
            setOpen(false);
        } catch (error) {
            console.error("Erro ao cadastrar PDV:", error);
            setSnackbarMessage("Erro ao cadastrar PDV. Tente novamente.");
            setSnackbarOpen(true);
                       
            setUpdate(false)
        }
    };


    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Meus Pdv`s" />
                    <Tab label="Meus Tokens" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6" gutterBottom></Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                startIcon={<SlScreenDesktop />}
                            >
                                Novo PDV
                            </Button>
                        </Box>
                        <hr></hr>
                        <PdvList token={token} update={update}/>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6" gutterBottom></Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { }}
                                startIcon={<BsCreditCard2BackFill />}
                            >
                                Comprar token
                            </Button>
                        </Box>
                        <hr></hr>
                        <TokenList token={token} />
                    </Box>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle > Cadastrar Novo PDV</DialogTitle>
                <DialogContent>
                    <PdvForm token={token} onSubmit={handleFormSubmit} onClose={handleClose} />
                </DialogContent>
            </Dialog>

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

export default PDVS;