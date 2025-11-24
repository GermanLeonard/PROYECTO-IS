import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // manejo de modo oscuro
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };


  return (
    <nav className={`navbar ${showMenu ? "responsive" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={assets.logo} alt="logo" />
        SPORT SPOT
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className="nav-links">
        <a href="/#header"><li>Inicio</li></a>
        <a href="/#sedes"><li>Sedes</li></a>
        <a href="/#nosotros"><li>Nosotros</li></a>
        <a href="/#faq"><li>FAQ</li></a>
        <a href="/#contact"><li>Contáctanos</li></a>
      </ul>

      {/*Botón de modo oscuro*/}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <ul className="profile">
        {token ? (
          <div className="nav-profile">
            <img src={assets.userImg} alt="profile" />
            <img src={assets.dropdownIcon} alt="dropdown" />
            <div className="nav-dropdown-container">
              <div className="nav-dropdown">
                <p onClick={() => navigate("/mis-reservas")}>Mis Reservas</p>
                <p onClick={logout}>Cerrar Sesión</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <li>
              <a href="/register" className="register-btn">Regístrate</a>
            </li>
            <li>
              <a href="/login" className="login-btn">Ingresa</a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
