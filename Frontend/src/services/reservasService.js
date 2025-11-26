import axios from "axios";

/**
 * Servicio para manejar todas las operaciones relacionadas con reservas
 */
const reservasService = {
  /**
   * Obtiene todas las reservas del usuario
   * @param {string} backendUrl - URL del backend
   * @param {string} token - Token de autenticación del usuario
   * @returns {Promise} - Promesa con los datos de las reservas
   */
  obtenerReservas: async (backendUrl, token) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/mis-reservas`, {
        headers: { token },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener reservas");
    }
  },

  /**
   * Cancela una reserva específica
   * @param {string} backendUrl - URL del backend
   * @param {string} token - Token de autenticación del usuario
   * @param {string} reservaId - ID de la reserva a cancelar
   * @returns {Promise} - Promesa con el resultado de la cancelación
   */
  cancelarReserva: async (backendUrl, token, reservaId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelar-reserva`,
        { reservaId },
        { headers: { token } }
      );
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al cancelar reserva");
    }
  },

  /**
   * Verifica si una reserva ya pasó
   * @param {Object} reserva - Objeto de reserva con espacioFecha y reservaHora
   * @returns {boolean} - true si la reserva ya pasó, false si no
   */
  reservaYaPaso: (reserva) => {
    const [dia, mes, year] = reserva.espacioFecha.split("_").map(Number);
    const [hora, minuto] = reserva.reservaHora.split(":").map(Number);

    const fechaReserva = new Date(year, mes - 1, dia, hora, minuto);
    const ahora = new Date();

    return fechaReserva < ahora;
  },

  /**
   * Formatea una fecha en formato legible
   * @param {string} espacioFecha - Fecha en formato "dia_mes_año"
   * @returns {string} - Fecha formateada
   */
  formatearFecha: (espacioFecha) => {
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const [dia, mes, year] = espacioFecha.split("_");
    return `${dia} ${meses[Number(mes)]} ${year}`;
  },
};

export default reservasService;