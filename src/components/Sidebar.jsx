import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Importe useNavigate
import { FaHome, FaExchangeAlt, FaChartLine, FaNewspaper, FaCog, FaLifeRing, FaNetworkWired, FaBuilding } from "react-icons/fa"; // Ícones importados
import { AiOutlineMenu } from "react-icons/ai"; // Ícone de menu
import Profile from "../Images/profile.png";
import { PiMonitorFill, PiUsersThreeFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use o hook useNavigate para navegação
    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleItemClick = (path) => {
        console.log(`Item clicado: ${path}`);
        navigate(path); // Navegação sem refresh da página
    };

    return (
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div className={closeMenu ? "logoContainer active" : "logoContainer"}>
                <FaNetworkWired size={closeMenu ? '40px' : '30px'} />
                <h2 className="title">Work</h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div className={closeMenu ? "profileContainer active" : "profileContainer"}>
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, Jóse</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>
            <div className={closeMenu ? "contentsContainer active" : "contentsContainer"}>
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""} onClick={() => handleItemClick('/')}>
                        <PiUsersThreeFill size={18} />
                        <Link to="/">Contratos</Link>
                    </li>
                    <li className={location.pathname === "/empresa" ? "active" : ""} onClick={() => handleItemClick('/empresa')}>
                        <FaBuilding size={16} />
                        <Link to="/empresa">Empresa</Link>
                    </li>
                    <li className={location.pathname === "/filial" ? "active" : ""} onClick={() => handleItemClick('/filial')}>
                        <FaNetworkWired size={16} />
                        <Link to="/filial">Filial</Link>
                    </li>
                    <li className={location.pathname === "/pdvs" ? "active" : ""} onClick={() => handleItemClick('/pdvs')}>
                        <PiMonitorFill size={16} />
                        <Link to="/pdvs">PDV’s</Link>
                    </li>
                    <li className={location.pathname === "/faturas" ? "active" : ""} onClick={() => handleItemClick('/faturas')}>
                        <MdOutlinePayment size={16} />
                        <Link to="/faturas">Minhas faturas</Link>
                    </li>
                    <li className={location.pathname === "/support" ? "active" : ""} onClick={() => handleItemClick('/support')}>
                        <FaLifeRing  size={16}/>
                        <Link to="/support">support</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
