import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaExchangeAlt,
    FaChartLine,
    FaNewspaper,
    FaCog,
    FaLifeRing,
    FaNetworkWired,
    FaBuilding,
    FaUser,
    FaChevronDown,
    FaChevronUp
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

    // Estado para controlar se os submenus estão abertos ou fechados
    const [openSubmenus, setOpenSubmenus] = useState({
        contratos: false,
        empresa: false,
        filial: false,
        tokens: false,
        faturas: false,
    });

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    const toggleSubmenu = (menu) => {
        setOpenSubmenus((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu], // Alterna entre aberto e fechado
        }));
    };

    const menuItems = [
        {
            path: "/pagamentos",
            label: "Pagamentos",
            icon: <PiUsersThreeFill size={18} />,
            isParent: true,
            submenu: [
                { path: "/pagamentos/links", label: "Link pagamentos", icon: <FaNetworkWired size={14} /> },
                { path: "/pagamentos/pix", label: "Pix", icon: <FaExchangeAlt size={14} /> },
            ],
        },
        // {
        //     path: "/empresa",
        //     label: "Empresa",
        //     icon: <FaBuilding size={16} />,
        //     isParent: true,
        //     submenu: [
        //         { path: "/empresa/info", label: "Informações", icon: <FaNewspaper size={14} /> },
        //         { path: "/empresa/relatorios", label: "Relatórios", icon: <FaChartLine size={14} /> },
        //     ],
        // },
        // {
        //     path: "/filial",
        //     label: "Filial",
        //     icon: <FaNetworkWired size={16} />,
        //     isParent: true,
        //     submenu: [
        //         { path: "/filial/relatorio", label: "Relatório", icon: <MdOutlinePayment size={14} /> },
        //         { path: "/filial/estoque", label: "Estoque", icon: <FaCog size={14} /> },
        //     ],
        // },
        // { path: "/tokens", label: "Tokens", icon: <PiMonitorFill size={16} /> },
        // { path: "/faturas", label: "Minhas faturas", icon: <MdOutlinePayment size={16} /> },
    ];

    return (
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div
                className={closeMenu ? "logoContainer active" : "logoContainer"}
                onClick={handleCloseMenu}
            >
                {/* <Box
                    component="img"
                    src="./image.png"
                    alt="Illustration"
                    style={{ width: closeMenu ? "40px" : "30px" }}
                /> */}
                <h2 className="title">WizePag</h2>
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
                            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                            key={item.path}
                            className={location.pathname === item.path ? "active" : ""}
                            onClick={() => {
                                if (item.isParent) {
                                    toggleSubmenu(item.label.toLowerCase());
                                } else {
                                    handleItemClick(item.path);
                                }
                            }}
                        >
                            <Tooltip
                                title={!closeMenu ? "" : item.label}
                                placement="right"
                                arrow
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {item.icon}
                                    {!closeMenu && <span>{item.label}</span>}
                                    {item.isParent && (
                                        <span style={{ marginLeft: "auto" }}>
                                            {openSubmenus[item.label.toLowerCase()] ? (
                                                <FaChevronUp size={12} />
                                            ) : (
                                                <FaChevronDown size={12} />
                                            )}
                                        </span>
                                    )}
                                </span>
                            </Tooltip>
                            {item.isParent && openSubmenus[item.label.toLowerCase()] && (
                                <ul className="submenu" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    {item.submenu.map((submenuItem) => (
                                        <li
                                            key={submenuItem.path}
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                gap: "4px",
                                                alignContent:'center'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleItemClick(submenuItem.path);
                                            }}
                                            className={location.pathname === submenuItem.path ? "active" : ""}
                                        >
                                            {submenuItem.icon}
                                            {!closeMenu && <span>{submenuItem.label}</span>}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
