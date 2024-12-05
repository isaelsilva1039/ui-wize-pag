import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBuilding, FaNetworkWired } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const MobileSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { newUser } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleItemClick = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false); // Fecha o menu ao clicar em uma opção
    };

    const menuItems = [
        { path: "/contratos", label: "Contratos", icon: <PiUsersThreeFill size={18} /> },
        { path: "/empresa", label: "Empresa", icon: <FaBuilding size={16} /> },
        { path: "/filial", label: "Filial", icon: <FaNetworkWired size={16} /> },
        { path: "/tokens", label: "Tokens", icon: <PiUsersThreeFill size={18} /> },
        { path: "/faturas", label: "Minhas faturas", icon: <MdOutlinePayment size={16} /> },
    ];

    return (
        <>
            {/* Navbar com botão de menu */}
            <div className="mobile-navbar">
                <button className="menu-toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Menu lateral */}
            {isMobileMenuOpen && (
                <div className="mobile-sidebar">
                    <div className="profile-container">
                        {newUser?.name ? (
                            <Avatar sx={{ bgcolor: "#3f51b5", width: 56, height: 56 }}>
                                {newUser.name[0]?.toUpperCase()}
                            </Avatar>
                        ) : (
                            <Avatar sx={{ bgcolor: "#3f51b5", width: 56, height: 56 }}>?</Avatar>
                        )}
                        <div className="profile-contents">
                            <p className="name">{newUser?.name}</p>
                            <p>{newUser?.username}</p>
                        </div>
                    </div>
                    <ul className="menu-items">
                        {menuItems.map((item) => (
                            <li
                                key={item.path}
                                className={location.pathname === item.path ? "active" : ""}
                                onClick={() => handleItemClick(item.path)}
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default MobileSidebar;
