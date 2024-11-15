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
import { FaCheckCircle, FaPhotoVideo, FaUser } from "react-icons/fa";

import FilialTable from "../components/FIlial/FilialTable";
import mockFiliais from "../mocks/mockFiliais";
import FilialForm from "../components/FIlial/FilialForm";
import PdvList from "../components/Pdvs/PdvList";
import { SlScreenDesktop } from "react-icons/sl";
import TokenList from "../components/Pdvs/token-lista";
import { BsCreditCard2BackFill } from "react-icons/bs";
import PdvForm from "../components/Pdvs/PdvForm";

const PDVS = () => {
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

    const handleFormSubmit = (formData) => {
        console.log("Novo PDV cadastrado:", formData);
        setOpen(false);
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
                        <PdvList />
                    </Box>
                )}
                  {tabIndex === 1 && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6" gutterBottom></Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {}}
                                startIcon={<BsCreditCard2BackFill />}
                            >
                                Comprar token
                            </Button>
                        </Box>
                        <hr></hr>
                        <TokenList />
                    </Box>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle > Cadastrar Novo PDV</DialogTitle>
                <DialogContent>
                    <PdvForm onSubmit={handleFormSubmit} onClose={handleClose} />
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

        </div>
    );
};

export default PDVS;