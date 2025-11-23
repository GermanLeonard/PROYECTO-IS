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

  const { backendUrl, token, getCanchasData } = useContext(AppContext)
  const [reservas, setReservas] = useState([])

  const getReservas = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/mis-reservas', { headers: { token } })
      if (data.success) {
        setReservas(data.reservas.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelarReserva = async (reservaId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancelar-reserva', { reservaId }, { headers: { token } })
      if (data.success) {
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

  // 🔥 NUEVO: función para saber si la fecha ya pasó
  const reservaYaPaso = (item) => {
    const [dia, mes, year] = item.espacioFecha.split('_').map(Number)
    const [hora, minuto] = item.reservaHora.split(':').map(Number)

    const fechaReserva = new Date(year, mes - 1, dia, hora, minuto)
    const ahora = new Date()

    return fechaReserva < ahora
  }

  useEffect(() => {
    if (token) {
      getReservas()
    }
  }, [token])

  return (
    <div className='mis-reservas'>
      <p>Mis Reservas</p>
      <div>
        {reservas.map((item, index) => {
          const paso = reservaYaPaso(item)

          return (
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
                <p>
                  <span>Fecha y Hora: </span>
                  {formatoFecha(item.espacioFecha)} | {item.reservaHora}
                </p>

                {/* 🔥 NUEVO: mostrar estado de la reserva */}
                {item.cancelado && <p className="estado-cancelado">🚫 Reserva cancelada</p>}
                {!item.cancelado && paso && <p className="estado-expirada">⏳ Reserva expirada</p>}
              </div>

              <div>
                {/* 🔥 NUEVO: reglas para mostrar o no el botón */}
                {!item.cancelado && !paso && (
                  <button
                    onClick={() => {
                      cancelarReserva(item._id)
                      window.location.reload()
                    }}
                  >
                    Cancelar reserva
                  </button>
                )}

                {(item.cancelado || paso) && (
                  <button disabled className="btn-deshabilitado">
                    No disponible
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MisReservas
