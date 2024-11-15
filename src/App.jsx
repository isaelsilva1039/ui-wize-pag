import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Support from "./pages/Support";
import Sidebar from "./components/Sidebar";
import Contratos from "./pages/Contatos";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Empresa from "./pages/Empresa";
import Filial from "./pages/Filial";
import PDVS from "./pages/PDVS";

function App() {
    const [closeMenu, setCloseMenu] = useState(false);

    return (
        <Router>
            <div className="app-container">
                <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
                <div className={`main-content ${closeMenu ? "sidebar-closed" : "sidebar-open"}`}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Contratos />} />
                        <Route path="/empresa" element={<Empresa />} />
                        <Route path="/filial" element={<Filial />} />
                        <Route path="/pdvs" element={<PDVS />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/faturas" element={<Transactions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
