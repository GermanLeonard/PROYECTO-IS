import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import reservasService from "../services/reservasService";
import "../styles/MisReservas.css";

const MisReservas = () => {
  const { backendUrl, token, getCanchasData } = useContext(AppContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas"); // todas, activas, pasadas, canceladas

  const imagenes = {
    Futbol: assets.CanchaFutbolEjemplo,
    Basketball: assets.CanchaBasketballEjemplo,
    Padel: assets.CanchaPadelEjemplo,
  };

  /**
   * Obtiene las reservas del usuario
   */
  const cargarReservas = async () => {
    setLoading(true);
    try {
      const data = await reservasService.obtenerReservas(backendUrl, token);
      if (data.success) {
        setReservas(data.reservas.reverse());
      } else {
        toast.error(data.message || "Error al cargar reservas");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancela una reserva específica
   */
  const manejarCancelacion = async (reservaId) => {
    // Confirmación antes de cancelar
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      return;
    }

    try {
      const data = await reservasService.cancelarReserva(
        backendUrl,
        token,
        reservaId
      );
      
      if (data.success) {
        toast.success(data.message || "Reserva cancelada exitosamente");
        await cargarReservas();
        getCanchasData();
      } else {
        toast.error(data.message || "Error al cancelar reserva");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Filtra las reservas según el filtro seleccionado
   */
  const reservasFiltradas = reservas.filter((reserva) => {
    const paso = reservasService.reservaYaPaso(reserva);

    switch (filtro) {
      case "activas":
        return !reserva.cancelado && !paso;
      case "pasadas":
        return !reserva.cancelado && paso;
      case "canceladas":
        return reserva.cancelado;
      default:
        return true;
    }
  });

  /**
   * Obtiene el badge de estado de la reserva
   */
  const obtenerEstadoBadge = (reserva) => {
    const paso = reservasService.reservaYaPaso(reserva);

    if (reserva.cancelado) {
      return <span className="badge badge-cancelado">Cancelada</span>;
    }
    if (paso) {
      return <span className="badge badge-expirada">Expirada</span>;
    }
    return <span className="badge badge-activa">Activa</span>;
  };

  useEffect(() => {
    if (token) {
      cargarReservas();
    }
  }, [token]);

  return (
    <div className="mis-reservas-container">
      <div className="mis-reservas-header">
        <h1>Mis Reservas</h1>
        <p className="mis-reservas-subtitle">
          Gestiona todas tus reservas en un solo lugar
        </p>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <button
          className={`filtro-btn ${filtro === "todas" ? "activo" : ""}`}
          onClick={() => setFiltro("todas")}
        >
          Todas ({reservas.length})
        </button>
        <button
          className={`filtro-btn ${filtro === "activas" ? "activo" : ""}`}
          onClick={() => setFiltro("activas")}
        >
          Activas (
          {
            reservas.filter(
              (r) => !r.cancelado && !reservasService.reservaYaPaso(r)
            ).length
          }
          )
        </button>
        <button
          className={`filtro-btn ${filtro === "pasadas" ? "activo" : ""}`}
          onClick={() => setFiltro("pasadas")}
        >
          Pasadas (
          {
            reservas.filter(
              (r) => !r.cancelado && reservasService.reservaYaPaso(r)
            ).length
          }
          )
        </button>
        <button
          className={`filtro-btn ${filtro === "canceladas" ? "activo" : ""}`}
          onClick={() => setFiltro("canceladas")}
        >
          Canceladas ({reservas.filter((r) => r.cancelado).length})
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-container">
          <p>Cargando reservas...</p>
          <div className="progress-bar-container">
            <div className="progress-bar-indeterminate"></div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && reservas.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h2>No tienes reservas</h2>
          <p>Cuando hagas una reserva, aparecerá aquí</p>
          <a href="/#sedes" className="btn-primary">
            Explorar Canchas
          </a>
        </div>
      )}

      {/* Empty filtered state */}
      {!loading && reservas.length > 0 && reservasFiltradas.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2>No hay reservas {filtro}</h2>
          <p>Intenta cambiar el filtro para ver otras reservas</p>
        </div>
      )}

      {/* Reservas list */}
      {!loading && reservasFiltradas.length > 0 && (
        <div className="reservas-grid">
          {reservasFiltradas.map((reserva) => {
            const paso = reservasService.reservaYaPaso(reserva);

            return (
              <div
                key={reserva._id}
                className={`reserva-card ${
                  reserva.cancelado ? "cancelada" : paso ? "expirada" : ""
                }`}
              >
                {/* Badge de estado */}
                <div className="reserva-badge">
                  {obtenerEstadoBadge(reserva)}
                </div>

                {/* Imagen */}
                <div className="reserva-imagen">
                  <img
                    src={imagenes[reserva.canchaData.deporte]}
                    alt={`Cancha de ${reserva.canchaData.deporte}`}
                  />
                  <div className="reserva-deporte-overlay">
                    {reserva.canchaData.deporte}
                  </div>
                </div>

                {/* Información */}
                <div className="reserva-info">
                  <h3 className="reserva-nombre">
                    {reserva.canchaData.name}
                  </h3>

                  <div className="reserva-detalle">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{reserva.canchaData.direccion}</span>
                  </div>

                  <div className="reserva-detalle">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>
                      {reservasService.formatearFecha(reserva.espacioFecha)}
                    </span>
                  </div>

                  <div className="reserva-detalle">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{reserva.reservaHora}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="reserva-acciones">
                  {!reserva.cancelado && !paso && (
                    <button
                      onClick={() => manejarCancelacion(reserva._id)}
                      className="btn-cancelar"
                    >
                      Cancelar Reserva
                    </button>
                  )}

                  {(reserva.cancelado || paso) && (
                    <button className="btn-deshabilitado" disabled>
                      No Disponible
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MisReservas;