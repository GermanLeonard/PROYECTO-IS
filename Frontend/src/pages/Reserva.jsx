import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import "../styles/Reserva.css";

/**
 * Componente de Reserva - Muestra y filtra canchas disponibles
 */
const Reserva = () => {
  const navigate = useNavigate();
  const { sucursal } = useParams();
  const { canchas } = useContext(AppContext);

  const [canchasFiltradas, setCanchasFiltradas] = useState([]);
  const [deporteSeleccionado, setDeporteSeleccionado] = useState("");
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(sucursal || "");
  const [loading, setLoading] = useState(true);

  const imagenes = {
    Futbol: assets.CanchaFutbolEjemplo,
    Basketball: assets.CanchaBasketballEjemplo,
    Padel: assets.CanchaPadelEjemplo,
  };

  /**
   * Filtra las canchas según los criterios seleccionados
   */
  useEffect(() => {
    setLoading(true);
    let filtrado = [...canchas];

    // Filtrar por sucursal
    if (sucursalSeleccionada) {
      filtrado = filtrado.filter(
        (cancha) => cancha.lugar_id === sucursalSeleccionada
      );
    }

    // Filtrar por deporte
    if (deporteSeleccionado) {
      filtrado = filtrado.filter(
        (cancha) => cancha.deporte === deporteSeleccionado
      );
    }

    setCanchasFiltradas(filtrado);
    setLoading(false);
  }, [canchas, sucursalSeleccionada, deporteSeleccionado]);

  /**
   * Maneja el cambio de sucursal
   */
  const manejarCambioSucursal = (valor) => {
    setSucursalSeleccionada(valor);
    navigate(valor ? `/reserva/${valor}` : "/reserva");
  };

  /**
   * Obtiene las sucursales únicas
   */
  const obtenerSucursales = () => {
    const sucursalesMap = new Map(
      canchas.map((item) => [item.lugar, item.lugar_id])
    );
    return Array.from(sucursalesMap);
  };

  /**
   * Obtiene los deportes únicos
   */
  const obtenerDeportes = () => {
    return Array.from(new Set(canchas.map((item) => item.deporte)));
  };

  /**
   * Navega a la página de detalle de la cancha
   */
  const irADetalleCancha = (canchaId) => {
    navigate(`/cancha/${canchaId}`);
  };

  return (
    <div className="reserva-container">
      {/* Header */}
      <div className="reserva-header">
        <h1>Reserva de Instalaciones Deportivas</h1>
        <p className="reserva-subtitle">
          Encuentra y reserva la cancha perfecta para tu deporte favorito
        </p>
      </div>

      {/* Filtros */}
      <div className="filtros-section">
        <div className="filtro-group">
          <label htmlFor="sucursal-select">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Sucursal</span>
          </label>
          <select
            id="sucursal-select"
            value={sucursalSeleccionada}
            onChange={(e) => manejarCambioSucursal(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todas las sucursales</option>
            {obtenerSucursales().map(([lugar, lugar_id]) => (
              <option key={lugar_id} value={lugar_id}>
                {lugar}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label htmlFor="deporte-select">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span>Deporte</span>
          </label>
          <select
            id="deporte-select"
            value={deporteSeleccionado}
            onChange={(e) => setDeporteSeleccionado(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos los deportes</option>
            {obtenerDeportes().map((deporte, index) => (
              <option key={index} value={deporte}>
                {deporte}
              </option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        <div className="resultados-count">
          <span className="count-number">{canchasFiltradas.length}</span>
          <span className="count-text">
            {canchasFiltradas.length === 1 ? "cancha disponible" : "canchas disponibles"}
          </span>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-container">
          <div className="progress-bar-container">
            <div className="progress-bar-indeterminate"></div>
          </div>
          <p>Cargando canchas...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && canchasFiltradas.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🏟️</div>
          <h2>No se encontraron canchas</h2>
          <p>
            Intenta cambiar los filtros para ver más opciones disponibles
          </p>
        </div>
      )}

      {/* Grid de canchas */}
      {!loading && canchasFiltradas.length > 0 && (
        <div className="canchas-grid">
          {canchasFiltradas.map((cancha) => (
            <div
              key={cancha._id}
              className="cancha-card"
              onClick={() => irADetalleCancha(cancha._id)}
            >
              {/* Sección de imagen */}
              <div className="cancha-imagen-section">
                <img
                  src={imagenes[cancha.deporte]}
                  alt={`Cancha de ${cancha.deporte}`}
                  className="cancha-imagen"
                />
                <span className="cancha-deporte-tag">
                  {cancha.deporte}
                </span>
              </div>

              {/* Sección de contenido */}
              <div className="cancha-contenido-section">
                {/* Título y ubicación */}
                <div className="cancha-info-principal">
                  <h3 className="cancha-titulo">{cancha.name}</h3>
                  <div className="cancha-ubicacion-info">
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

                {/* Footer con estado y acción */}
                <div className="cancha-acciones-footer">
                  <div className="cancha-estado-badge">
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
                    className="btn-ver-horarios"
                    onClick={(e) => {
                      e.stopPropagation();
                      irADetalleCancha(cancha._id);
                    }}
                  >
                    Ver Horarios
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reserva;