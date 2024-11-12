import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Ícone de sair (logout)
import "../styles/main.scss"; // Certifique-se de importar o CSS se estiver usando SCSS

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        console.log("Logout"); // Aqui você pode adicionar a lógica de logout
        navigate("/login"); // Exemplo de redirecionamento após logout
    };


 

    return (
        <div className="navbar">
            {location.pathname === "/" ? "Contratos" : location.pathname.replace("/", "")}
            <div className="logout" onClick={handleLogout}>
                <FiLogOut size={20} /> <span>Sair</span>
            </div>
        </div>
    );
};

export default NavBar;
