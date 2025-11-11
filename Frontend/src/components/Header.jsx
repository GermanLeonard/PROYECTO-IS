import React, { useState, useEffect } from "react";
import "../styles/Header.css"; 
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const images = [assets.bkb, assets.futbol, assets.padel];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <header className="header" id="header">
      <div className="slider">
        <button className="arrow left-arrow" onClick={handlePrevious}>
          &#9664;
        </button>
        <img src={images[currentIndex]} alt="Deportes" className="slider-image" />
        <button className="arrow right-arrow" onClick={handleNext}>
          &#9654;
        </button>
        <div className="slide-text">
          <h1>
            <span>CONQUISTA</span> TU POTENCIAL
          </h1>
          <p>
            Descubre todas las opciones que tenemos disponibles para ti dentro
            de nuestras sedes deportivas.
          </p>
          <button className="reserve-btn" onClick={() => navigate("/reserva")}>
            RESERVA
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
