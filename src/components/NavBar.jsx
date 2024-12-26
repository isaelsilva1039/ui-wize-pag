import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Ícone de sair (logout)
import { FaBars } from "react-icons/fa"; // Ícone de menu
import "../styles/main.scss"; // Certifique-se de importar o CSS se estiver usando SCSS
import { useMediaQuery } from "@mui/material";

const NavBar = ({ closeMenu, setCloseMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Função para alternar o estado do menu
    const handleMenuToggle = () => {
        setCloseMenu(!closeMenu); // Alterna entre abrir e fechar o menu
    };

    const isMobile = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && !event.target.closest('.menu-toggle')) {
                setCloseMenu(true);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobile, setCloseMenu]);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/");
    };

    return (
        <div className="navbar">
            <div className="menu-toggle" onClick={handleMenuToggle}>
                <FaBars size={24} /> {/* Ícone de menu */}
            </div>
            <div>
                {location.pathname === "/" ? "Contratos" : location.pathname.replace("/", "")}
            </div>
            <div className="logout" onClick={handleLogout}>
                <FiLogOut size={20} /> <span>Sair</span>
            </div>
        </div>
    );
};

export default NavBar;
