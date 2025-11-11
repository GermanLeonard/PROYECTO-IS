import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import '../styles/MisReservas.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MisReservas = () => {
  const imagenes = {
    Futbol: assets.CanchaFutbolEjemplo,
    Basketball: assets.CanchaBasketballEjemplo,
    Padel: assets.CanchaPadelEjemplo
  }
  const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const formatoFecha = (espacioFecha) => {
    const fechaArray = espacioFecha.split('_')
    return fechaArray[0] + ' ' + meses[Number(fechaArray[1])] + ' ' + fechaArray[2]
  }

  const {backendUrl, token, getCanchasData} = useContext(AppContext)
  const [reservas, setReservas] = useState([])

  const getReservas = async () => {
    console.log("Ejecutando getReservas...");
    try {
      const {data} = await axios.get(backendUrl + '/api/user/mis-reservas', {headers: {token}})
      if(data.success) {
        setReservas(data.reservas.reverse())
        console.log(data.reservas);
        
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelarReserva = async (reservaId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancelar-reserva', {reservaId}, {headers: {token}})
      if(data.success){
        getReservas()
        toast.success(data.message)
        getCanchasData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      getReservas()
    }
  }, [token])
  return (
    <div className='mis-reservas'>
        <p>Mis Reservas</p>
        <div>
          {reservas.map((item, index) => (
            <div key={index} className='reserva-card'>
              <div>
                <img src={imagenes[item.canchaData.deporte]} alt="cancha" />
              </div>
              <div>
                <p>{item.canchaData.name}</p>
                <p>{item.canchaData.deporte}</p>
                <br />
                <p>Dirección:</p>
                <p>{item.canchaData.direccion}</p>
                <br />
                <p><span>Fecha y Hora:</span>{formatoFecha(item.espacioFecha)} | {item.reservaHora}</p>
              </div>
              <div>
                {!item.cancelado && <button onClick={() => {cancelarReserva(item._id)
                window.location.reload()
                }}>Cancelar reserva</button>}
                {item.cancelado && <button>Reserva Cancelada</button>}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MisReservas