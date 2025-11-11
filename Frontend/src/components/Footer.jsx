import React from 'react';
import '../styles/Footer.css';
import { assets } from "../assets/assets";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-logo">
          <img src={assets.logo} alt="logo" />
        </div>
        <div className="footer-text">
          &copy;2024 Sport Spot. Todos los derechos reservados.
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook} alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.instagram} alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.twitter} alt="Twitter" />
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
