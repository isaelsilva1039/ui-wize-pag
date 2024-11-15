import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Box,
  
} from "@mui/material";

import '../styles/contatos/contratos.scss'
import InvoiceList from "../components/Minhas-faturas/InvoiceList";

const Faturas = () => {
    const [tabIndex, setTabIndex] = useState(0);


    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };


    return (
        <div className="container">
            <Box sx={{ width: "100%", p: 3 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Minhas faturas" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box sx={{ mt: 3 }}>

                        <hr></hr>
                        <InvoiceList />
                    </Box>
                )}
            </Box>

        </div>
    );
};

export default Faturas;