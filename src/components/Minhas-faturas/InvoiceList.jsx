import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    Menu,
    MenuItem
} from "@mui/material";
import { Payment, Pix, Receipt, CreditCard } from "@mui/icons-material";
import '../../styles/fatura/fatura.scss'

const invoiceData = [
    {
        id: 1,
        description: "Fatura 001",
        dueDate: "2024-11-20",
        amount: "R$ 500,00",
        status: "ATRASADO"
    },
    {
        id: 2,
        description: "Fatura 002",
        dueDate: "2024-12-05",
        amount: "R$ 1.200,00",
        status: "PAGO"
    },
    {
        id: 3,
        description: "Fatura 003",
        dueDate: "2024-12-10",
        amount: "R$ 750,00",
        status: "PENDENTE"
    },
    {
        id: 4,
        description: "Fatura 004",
        dueDate: "2024-12-15",
        amount: "R$ 300,00",
        status: "PENDENTE"
    }
];

const statusColors = {
    ATRASADO: "red",
    PAGO: "green",
    PENDENTE: "orange"
};

const InvoiceList = () => {
    const [hoveredInvoice, setHoveredInvoice] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMouseEnter = (id, event) => {
        setHoveredInvoice(id);
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setHoveredInvoice(null);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ p: 2, position: "relative" }}>
            <Typography variant="h5" gutterBottom>
                Minhas Faturas
            </Typography>
            <Grid container spacing={2}>
                {invoiceData.map((invoice) => (
                    <Grid 
                        item 
                        xs={12} 
                        key={invoice.id}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Paper
                            className="fatura"
                            elevation={3} 
                            sx={{ 
                                p: 2, 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-between",
                                position: "relative"
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle1"><strong>{invoice.description}</strong></Typography>
                                <Typography variant="body2" color="textSecondary">Vencimento: {invoice.dueDate}</Typography>
                                <Typography variant="body2" color="textSecondary">Valor: {invoice.amount}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                            {(invoice.status === "PENDENTE" || invoice.status === "ATRASADO") && (
                                    <Tooltip title="Opções de Pagamento">
                                        <IconButton 
                                            color="primary" 
                                            onMouseEnter={(event) => handleMouseEnter(invoice.id, event)}
                                        >
                                            <Payment />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                <Chip 
                                    label={invoice.status}
                                    sx={{ backgroundColor: statusColors[invoice.status], color: "white", fontWeight: "bold" }}
                                />
                                
                            </Box>
                            {hoveredInvoice === invoice.id && (
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMouseLeave}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                >
                                    <MenuItem onClick={handleMouseLeave}><Pix fontSize="small" sx={{ mr: 1 }} /> PIX</MenuItem>
                                    <MenuItem onClick={handleMouseLeave}><Receipt fontSize="small" sx={{ mr: 1 }} /> Boleto</MenuItem>
                                    <MenuItem onClick={handleMouseLeave}><CreditCard fontSize="small" sx={{ mr: 1 }} /> Cartão de Crédito</MenuItem>
                                    <MenuItem onClick={handleMouseLeave}><Payment fontSize="small" sx={{ mr: 1 }} /> Débito</MenuItem>
                                </Menu>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default InvoiceList;
