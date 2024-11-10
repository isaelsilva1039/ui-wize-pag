import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./pages/News";
import Performance from "./pages/Performance";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Sidebar from "./components/Sidebar";
import Contratos from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Contratos />} />
                    <Route path="/empresa" element={<News />} />
                    <Route path="/Filial" element={<Performance />} />
                    <Route path="/pdvs" element={<Settings />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/faturas" element={<Transactions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
