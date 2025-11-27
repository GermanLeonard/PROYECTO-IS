import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Relacionado from "../components/Relacionado";
import canchasService from "../services/canchaService";
import "../styles/Cancha.css";

const Cancha = () => {
  const { canchaId } = useParams();
  const navigate = useNavigate();
  
  const { canchas, moneda, backendUrl, token, getCanchasData } = useContext(AppContext);
  
  const [canchaInfo, setCanchaInfo] = useState(null);
  const [reservaFecha, setReservaFecha] = useState([]);
  const [fechaIndex, setFechaIndex] = useState(0);
  const [reservaHora, setReservaHora] = useState("");
  const [loading, setLoading] = useState(true);

  const imagenes = {
    Futbol: assets.CanchaFutbolEjemplo,
    Basketball: assets.CanchaBasketballEjemplo,
    Padel: assets.CanchaPadelEjemplo,
  };

  /**
   * Obtiene la información de la cancha seleccionada
   */
  const cargarCanchaInfo = () => {
    setLoading(true);
    const cancha = canchasService.obtenerCanchaPorId(canchas, canchaId);
    
    if (cancha) {
      setCanchaInfo(cancha);
    } else {
      toast.error("Cancha no encontrada");
      navigate("/");
    }
    
    setLoading(false);
  };

  /**
   * Calcula y establece los horarios disponibles para la cancha
   */
  const cargarHorariosDisponibles = () => {
    if (!canchaInfo) return;

    const horarios = canchasService.calcularHorariosDisponibles(canchaInfo);
    setReservaFecha(horarios);
  };

  /**
   * Maneja la reserva de la cancha
   */
  const manejarReserva = async () => {
    // Validar autenticación
    if (!token) {
      toast.warn("Inicia Sesión Para Reservar Canchas");
      return navigate("/login");
    }

    // Validar selección de hora
    if (!reservaHora) {
      toast.warn("Por favor selecciona una hora");
      return;
    }

    // Validar que haya horarios disponibles
    if (!reservaFecha.length || !reservaFecha[fechaIndex]?.[0]?.fecha) {
      toast.error("No hay horarios disponibles para esta fecha");
      return;
    }

    try {
      const fecha = reservaFecha[fechaIndex][0].fecha;

      const data = await canchasService.reservarCancha(
        backendUrl,
        token,
        canchaId,
        fecha,
        reservaHora
      );

      if (data.success) {
        getCanchasData();
        toast.success(data.message || "Reserva realizada exitosamente");
        navigate("/mis-reservas");
      } else {
        toast.error(data.message || "Error al realizar la reserva");
      }
    } catch (error) {
      console.error("Error al reservar:", error);
      toast.error(error.message);
    }
  };

  /**
   * Maneja el cambio de fecha seleccionada
   */
  const cambiarFecha = (index) => {
    setFechaIndex(index);
    setReservaHora(""); // Reset hora al cambiar fecha
  };

  // Cargar información de la cancha cuando cambien las canchas o el ID
  useEffect(() => {
    if (canchas.length > 0) {
      cargarCanchaInfo();
    }
  }, [canchas, canchaId]);

  // Cargar horarios disponibles cuando se cargue la información de la cancha
  useEffect(() => {
    if (canchaInfo) {
      cargarHorariosDisponibles();
    }
  }, [canchaInfo]);

  // Loading state
  if (loading || !canchaInfo) {
    return (
      <div className="cancha-loading">
        <div className="loading-container">
          <p>Cargando información de la cancha...</p>
          <div className="progress-bar-container">
            <div className="progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cancha-container">
      {/* Card de información de la cancha */}
      <div className="cancha-card">
        <div className="cancha-imagen-container">
          <img
            src={imagenes[canchaInfo.deporte]}
            alt={`Cancha de ${canchaInfo.deporte}`}
            className="cancha-imagen"
          />
          <div className="cancha-deporte-badge">
            {canchaInfo.deporte}
          </div>
        </div>

        <div className="cancha-info">
          <div className="cancha-info-header">
            <h1 className="cancha-nombre">{canchaInfo.name}</h1>
            <div className="cancha-ubicacion">
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
              <span>{canchaInfo.lugar}</span>
            </div>
          </div>

          <div className="cancha-descripcion">
            <h3>Descripción</h3>
            <p>{canchaInfo.descripcion}</p>
          </div>

          <div className="cancha-precio">
            <span className="precio-label">Precio por hora:</span>
            <span className="precio-valor">
              {moneda}{canchaInfo.precioHora}
            </span>
          </div>
        </div>
      </div>

      {/* Sección de reserva */}
      <div className="reserva-section">
        <div className="reserva-header">
          <h2>Horarios de Reserva</h2>
          <p className="reserva-subtitle">
            Selecciona un día y hora para tu reserva
          </p>
        </div>

        {/* Selector de días */}
        <div className="dias-selector">
          {reservaFecha.length > 0 &&
            reservaFecha.map((dia, index) => {
              if (!dia[0]) return null;
              
              const fecha = dia[0].fecha;
              const diaSemana = canchasService.obtenerDiaSemana(fecha.getDay());
              const diaNumero = fecha.getDate();
              const mes = fecha.toLocaleDateString("es-ES", { month: "short" });

              return (
                <div
                  key={index}
                  onClick={() => cambiarFecha(index)}
                  className={`dia-card ${fechaIndex === index ? "activo" : ""}`}
                >
                  <span className="dia-semana">{diaSemana}</span>
                  <span className="dia-numero">{diaNumero}</span>
                  <span className="dia-mes">{mes}</span>
                </div>
              );
            })}
        </div>

        {/* Selector de horas */}
        <div className="horas-container">
          <h3 className="horas-titulo">Horas disponibles</h3>
          <div className="horas-grid">
            {reservaFecha.length > 0 && reservaFecha[fechaIndex] ? (
              reservaFecha[fechaIndex].length > 0 ? (
                reservaFecha[fechaIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setReservaHora(item.hora)}
                    className={`hora-btn ${
                      item.hora === reservaHora ? "activo" : ""
                    }`}
                  >
                    {item.hora}
                  </button>
                ))
              ) : (
                <p className="no-horarios">
                  No hay horarios disponibles para este día
                </p>
              )
            ) : (
              <p className="no-horarios">Cargando horarios...</p>
            )}
          </div>
        </div>

        {/* Botón de reserva */}
        <div className="reserva-actions">
          <div className="reserva-resumen">
            {reservaHora && (
              <>
                <span className="resumen-label">Reserva seleccionada:</span>
                <span className="resumen-info">
                  {reservaFecha[fechaIndex]?.[0]?.fecha.toLocaleDateString(
                    "es-ES",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                  - {reservaHora}
                </span>
              </>
            )}
          </div>
          <button
            onClick={manejarReserva}
            className="btn-reservar"
            disabled={!reservaHora}
          >
            {reservaHora ? "Confirmar Reserva" : "Selecciona una hora"}
          </button>
        </div>
      </div>

      {/* Canchas relacionadas */}
      <Relacionado canchaId={canchaId} deporte={canchaInfo.deporte} />
    </div>
  );
};

export default Cancha;