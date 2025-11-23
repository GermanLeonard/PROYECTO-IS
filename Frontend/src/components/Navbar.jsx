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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="logo" />
          <span>SPORT SPOT</span>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
          <li><a href="/#header" onClick={() => setShowMobileMenu(false)}>Inicio</a></li>
          <li><a href="/#sedes" onClick={() => setShowMobileMenu(false)}>Sedes</a></li>
          <li><a href="/#nosotros" onClick={() => setShowMobileMenu(false)}>Nosotros</a></li>
          <li><a href="/#faq" onClick={() => setShowMobileMenu(false)}>FAQ</a></li>
          <li><a href="/#contact" onClick={() => setShowMobileMenu(false)}>Contáctanos</a></li>
        </ul>

        {/* Profile / Auth Section */}
        <div className="navbar-profile">
          {token ? (
            <div className="profile-container" ref={profileRef}>
              <div 
                className="profile-trigger"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <img src={assets.userImg} alt="profile" className="profile-img" />
                <img 
                  src={assets.dropdownIcon} 
                  alt="dropdown" 
                  className={`dropdown-icon ${showProfileDropdown ? "rotate" : ""}`}
                />
              </div>
              
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <button onClick={() => handleNavigation("/mis-reservas")}>
                    Mis Reservas
                  </button>
                  <button onClick={logout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/register" className="btn btn-register">
                Regístrate
              </a>
              
              {/* Hamburger Menu - Shows between buttons on mobile */}
              <button 
                className={`hamburger ${showMobileMenu ? "active" : ""}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <a href="/login" className="btn btn-login">
                Ingresa
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;