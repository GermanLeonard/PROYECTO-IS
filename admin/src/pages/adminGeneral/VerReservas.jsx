import React, { useState } from "react";
import "../../styles/VerReservas.css";
import { useContext } from "react";
import { AdminGeneralContext } from "../../context/AdminGeneralContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

const VerReservas = () => {
  const { adminGeneralToken, reservas, getTodasReservas, backendUrl } = useContext(AdminGeneralContext);

  const cancelarReserva = async (reservaId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/admin-general/cancelar-reserva', {reservaId}, {headers: {adminGeneralToken}})
      if(data.success){
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filteredReservas, setFilteredReservas] = useState([]);
  const [selectedDeporte, setSelectedDeporte] = useState("");
  const [selectedSucursal, setSelectedSucursal] = useState("");

  useEffect(() => {
    if (adminGeneralToken) {
      getTodasReservas();
    }
  }, [adminGeneralToken]);

  useEffect(() => {
    let filtrado = reservas;

    if (selectedSucursal) {
      filtrado = filtrado.filter(
        (reserva) => reserva.canchaData.lugar == selectedSucursal
      );
    }

    if (selectedDeporte) {
      filtrado = filtrado.filter(
        (reserva) => reserva.canchaData.deporte == selectedDeporte
      );
    }

    setFilteredReservas(filtrado);
  }, [reservas, selectedSucursal, selectedDeporte]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredReservas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredReservas.length / itemsPerPage);

  return (
    <div className="eliminar-reservas-container">
      <h1 className="title">RESERVAS GLOBALES</h1>
      <div className="filter-section">
        <select
          className="filter-input"
          value={selectedSucursal}
          onChange={(e) => setSelectedSucursal(e.target.value)}
        >
          <option value="">Sucursal</option>
          {Array.from(
            new Set(reservas.map((item) => item.canchaData.lugar))
          ).map((lugar, index) => (
            <option key={index} value={lugar}>
              {lugar}
            </option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedDeporte}
          onChange={(e) => setSelectedDeporte(e.target.value)}
        >
          <option value="">Deporte</option>
          {Array.from(
            new Set(reservas.map((item) => item.canchaData.deporte))
          ).map((deporte, index) => (
            <option key={index} value={deporte}>
              {deporte}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cancha</th>
              <th>Deporte</th>
              <th>Sucursal</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Precio</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentData.filter((item) => item.cancelado == false).map((item, index) => (
              <tr key={index}>
                <td>{item.userData.username}</td>
                <td>{item.canchaData.name}</td>
                <td>{item.canchaData.deporte}</td>
                <td>{item.canchaData.lugar}</td>
                <td>{item.espacioFecha}</td>
                <td>{item.reservaHora}</td>
                <td>${item.canchaData.precioHora}</td>
                <td>
                  <i
                    className="fas fa-trash-alt delete-icon"
                    onClick={() => cancelarReserva(item._id)
                    }
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerReservas;
