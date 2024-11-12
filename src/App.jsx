import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./pages/News";
import Performance from "./pages/Performance";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Sidebar from "./components/Sidebar";
import Contratos from "./pages/Contatos";
import { useState } from "react";
import NavBar from "./components/NavBar";

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
                        <Route path="/empresa" element={<News />} />
                        <Route path="/filial" element={<Performance />} />
                        <Route path="/pdvs" element={<Settings />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/faturas" element={<Transactions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
