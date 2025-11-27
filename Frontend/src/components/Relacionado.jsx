import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../styles/Relacionado.css';

/**
 * Componente Relacionado - Muestra canchas similares
 * @param {string} canchaId - ID de la cancha actual
 * @param {string} deporte - Deporte de la cancha actual
 */
const Relacionado = ({ canchaId, deporte }) => {
  const { canchas } = useContext(AppContext);
  const [canchasRelacionadas, setCanchasRelacionadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const imagenes = {
    Futbol: assets.CanchaFutbolEjemplo,
    Basketball: assets.CanchaBasketballEjemplo,
    Padel: assets.CanchaPadelEjemplo,
  };

  /**
   * Filtra y establece las canchas relacionadas
   */
  useEffect(() => {
    if (canchas.length > 0 && deporte) {
      setLoading(true);
      
      // Filtrar canchas del mismo deporte excluyendo la actual
      const canchasFiltradas = canchas.filter(
        (cancha) => cancha.deporte === deporte && cancha._id !== canchaId
      );
      
      setCanchasRelacionadas(canchasFiltradas);
      setLoading(false);
    }
  }, [canchas, canchaId, deporte]);

  /**
   * Navega a la cancha seleccionada
   */
  const irACancha = (canchaIdSeleccionada) => {
    navigate(`/cancha/${canchaIdSeleccionada}`);
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // No mostrar si no hay canchas relacionadas
  if (!loading && canchasRelacionadas.length === 0) {
    return null;
  }

  return (
    <section className="relacionado-section">
      {/* Header */}
      <div className="relacionado-header">
        <h2 className="relacionado-titulo">Canchas Relacionadas</h2>
        <p className="relacionado-subtitulo">
          Explora más canchas de {deporte} disponibles
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="relacionado-loading">
          <div className="loading-spinner"></div>
          <p>Cargando canchas relacionadas...</p>
        </div>
      ) : (
        /* Grid de canchas */
        <div className="relacionado-grid">
          {canchasRelacionadas.slice(0, 5).map((cancha) => (
            <div
              key={cancha._id}
              onClick={() => irACancha(cancha._id)}
              className="relacionado-card"
            >
              {/* Imagen */}
              <div className="relacionado-imagen-section">
                <img
                  src={imagenes[cancha.deporte]}
                  alt={`Cancha de ${cancha.deporte}`}
                  className="relacionado-imagen"
                />
                <span className="relacionado-deporte-tag">
                  {cancha.deporte}
                </span>
              </div>

              {/* Contenido */}
              <div className="relacionado-contenido">
                {/* Información principal */}
                <div className="relacionado-info">
                  <h3 className="relacionado-nombre">{cancha.name}</h3>
                  <div className="relacionado-ubicacion">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{cancha.lugar}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="relacionado-footer">
                  <div className="relacionado-disponible">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Disponible</span>
                  </div>

                  <button
                    className="relacionado-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      irACancha(cancha._id);
                    }}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando hay pocas canchas */}
      {!loading && canchasRelacionadas.length > 0 && canchasRelacionadas.length < 3 && (
        <div className="relacionado-mensaje">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <p>
            Estas son todas las canchas de {deporte} disponibles en este momento
          </p>
        </div>
      )}
    </section>
  );
};

export default Relacionado;