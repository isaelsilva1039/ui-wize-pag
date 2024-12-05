import React, { useContext, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaExchangeAlt,
    FaChartLine,
    FaNewspaper,
    FaCog,
    FaLifeRing,
    FaNetworkWired,
    FaBuilding,
    FaUser
} from "react-icons/fa";
import { Avatar, Box, Tooltip } from "@mui/material";
import Profile from "../Images/profile.png";
import { PiMonitorFill, PiUsersThreeFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ closeMenu, setCloseMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { newUser } = useContext(AuthContext);


    console.log(newUser)
    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    const menuItems = [
        { path: "/contratos", label: "Contratos", icon: <PiUsersThreeFill size={18} /> },
        { path: "/empresa", label: "Empresa", icon: <FaBuilding size={16} /> },
        { path: "/filial", label: "Filial", icon: <FaNetworkWired size={16} /> },
        { path: "/tokens", label: "Tokens", icon: <PiMonitorFill size={16} /> },
        { path: "/faturas", label: "Minhas faturas", icon: <MdOutlinePayment size={16} /> },
        // { path: "/usuarios", label: "Usuarios", icon: <FaUser size={16} /> },
        // { path: "/support", label: "Suporte", icon: <FaLifeRing size={16} /> },
    ];

    return (
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div
                className={closeMenu ? "logoContainer active" : "logoContainer"}
                onClick={handleCloseMenu}
            >
             
                <Box
                        component="img"
                        src="./image.png"
                        alt="Illustration"
                        style={{ width : closeMenu ? "40px" : "30px"  }}
                        // className="login-illustration"
                    />

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
            <div
                className={
                    closeMenu
                        ? "profileContainer active"
                        : "profileContainer"
                }
            >
                {newUser?.name ? (
                    <Avatar sx={{ bgcolor: "#3f51b5", width: 56, height: 56 }}>
                        {newUser.name[0]?.toUpperCase()}    
                    </Avatar>
                ) : (
                    <Avatar sx={{ bgcolor: "#3f51b5", width: 56, height: 56 }}>
                        ?
                    </Avatar>
                )}
                <div className="profileContents">
                    <p className="name">{newUser?.name}</p>
                    <p>{newUser?.username}</p>
                </div>
            </div>

            <div
                className={
                    closeMenu
                        ? "contentsContainer active"
                        : "contentsContainer"
                }
            >
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={location.pathname === item.path ? "active" : ""}
                            onClick={() => handleItemClick(item.path)}
                        >
                            <Tooltip
                                title={!closeMenu ? "" : item.label} // Mostra o tooltip somente se o menu estiver fechado
                                placement="right"
                                arrow
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {item.icon}
                                    {!closeMenu && <span>{item.label}</span>} {/* Mostra o nome somente se o menu estiver aberto */}
                                </span>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
