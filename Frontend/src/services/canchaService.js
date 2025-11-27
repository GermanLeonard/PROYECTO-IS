import axios from "axios";

/**
 * Servicio para manejar todas las operaciones relacionadas con canchas
 */
const canchasService = {
  /**
   * Obtiene información de una cancha específica por ID
   * @param {Array} canchas - Array de todas las canchas disponibles
   * @param {string} canchaId - ID de la cancha a buscar
   * @returns {Object|undefined} - Objeto de la cancha encontrada o undefined
   */
  obtenerCanchaPorId: (canchas, canchaId) => {
    return canchas.find((cancha) => cancha._id === canchaId);
  },

  /**
   * Calcula los horarios disponibles para una cancha en los próximos 7 días
   * @param {Object} canchaInfo - Información de la cancha
   * @returns {Array} - Array de arrays con horarios disponibles por día
   */
  calcularHorariosDisponibles: (canchaInfo) => {
    const reservaFecha = [];
    const ahora = new Date();

    for (let i = 0; i < 7; i++) {
      // Obtener fecha con el índice
      const fechaActual = new Date(ahora);
      fechaActual.setDate(ahora.getDate() + i);

      // Establecer hora final del día
      const horaFin = new Date();
      horaFin.setDate(ahora.getDate() + i);
      horaFin.setHours(22, 0, 0, 0);

      // Si ya pasó la hora final del día actual (21:00), omitir ese día
      if (i === 0 && ahora.getHours() >= 21) {
        continue;
      }

      // Establecer hora de inicio
      if (ahora.getDate() === fechaActual.getDate()) {
        fechaActual.setHours(
          fechaActual.getHours() > 8 ? fechaActual.getHours() + 1 : 8
        );
        fechaActual.setMinutes(0);
      } else {
        fechaActual.setHours(8);
        fechaActual.setMinutes(0);
      }

      const horasDisponibles = [];

      while (fechaActual < horaFin) {
        const formatoTiempo = fechaActual.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();

        const espacioFecha = `${dia}_${mes}_${anio}`;
        const espacioTiempo = formatoTiempo;

        // Verificar si el horario está disponible
        const disponible = !(
          canchaInfo.espacios_reservados[espacioFecha] &&
          canchaInfo.espacios_reservados[espacioFecha].includes(espacioTiempo)
        );

        if (disponible) {
          horasDisponibles.push({
            fecha: new Date(fechaActual),
            hora: formatoTiempo,
          });
        }

        // Incrementar cada espacio por 1 hora
        fechaActual.setHours(fechaActual.getHours() + 1);
      }

      reservaFecha.push(horasDisponibles);
    }

    return reservaFecha;
  },

  /**
   * Realiza una reserva de cancha
   * @param {string} backendUrl - URL del backend
   * @param {string} token - Token de autenticación del usuario
   * @param {string} canchaId - ID de la cancha a reservar
   * @param {Date} fecha - Fecha de la reserva
   * @param {string} reservaHora - Hora de la reserva
   * @returns {Promise} - Promesa con el resultado de la reserva
   */
  reservarCancha: async (backendUrl, token, canchaId, fecha, reservaHora) => {
    try {
      // Asegurar que fecha es un objeto Date válido
      let fechaObj = fecha;
      if (!(fechaObj instanceof Date)) {
        fechaObj = new Date(fechaObj);
      }

      const dia = fechaObj.getDate();
      const mes = fechaObj.getMonth() + 1;
      const anio = fechaObj.getFullYear();

      const espacioFecha = `${dia}_${mes}_${anio}`;
      const fechaISO = fechaObj.toISOString().split("T")[0];

      const { data } = await axios.post(
        `${backendUrl}/api/user/reservar-cancha`,
        {
          canchaId,
          espacioFecha,
          reservaHora,
          fecha: fechaISO,
        },
        {
          headers: { token },
        }
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al reservar cancha"
      );
    }
  },

  /**
   * Obtiene el nombre del día de la semana en formato corto
   * @param {number} diaNumero - Número del día (0-6)
   * @returns {string} - Nombre corto del día
   */
  obtenerDiaSemana: (diaNumero) => {
    const diasSemana = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
    return diasSemana[diaNumero];
  },
};

export default canchasService;