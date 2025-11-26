import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // manejo de modo oscuro
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowProfileDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileDropdown(false);
    setShowMobileMenu(false);
  };

  return (
    <nav className={`navbar ${showMobileMenu ? "responsive" : ""}`}>
      <div className="navbar-container">
        <div className="logo navbar-logo" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="logo" />
          SPORT SPOT
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`nav-links navbar-links ${showMobileMenu ? "active" : ""}`}>
          <a href="/#header"><li>Inicio</li></a>
          <a href="/#sedes"><li>Sedes</li></a>
          <a href="/#nosotros"><li>Nosotros</li></a>
          <a href="/#faq"><li>FAQ</li></a>
          <a href="/#contact"><li>Contáctanos</li></a>
        </ul>

        {/*Botón de modo oscuro*/}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? (
            // Moon icon for dark mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            // Sun icon for light mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        <div className="profile">
          {token ? (
            <div className="profile-container" ref={profileRef}>
              <div className="profile-trigger" onClick={toggleProfileDropdown}>
                <img src={assets.userImg} alt="profile" className="profile-img" />
                <img 
                  src={assets.dropdownIcon} 
                  alt="dropdown" 
                  className={`dropdown-icon ${showProfileDropdown ? "rotate" : ""}`}
                />
              </div>
              
              <div 
                className="nav-dropdown-container" 
                style={{
                  display: showProfileDropdown ? 'block' : 'none',
                  opacity: showProfileDropdown ? 1 : 0,
                  visibility: showProfileDropdown ? 'visible' : 'hidden'
                }}
              >
                <div className="nav-dropdown">
                  <p onClick={() => handleNavigation("/mis-reservas")}>Mis Reservas</p>
                  <p onClick={logout}>Cerrar Sesión</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/register" className="register-btn">Regístrate</a>
              <a href="/login" className="login-btn">Ingresa</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;