import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../styles/Cancha.css'
import '../styles/Reserva.css'

const Relacionado = ({canchaId, deporte}) => {

    const {canchas} = useContext(AppContext)
    const [canchasRelacionadas, setCanchasRelacionadas] = useState([])
    const navigate = useNavigate()

    const imagenes = {
        Futbol: assets.CanchaFutbolEjemplo,
        Basketball: assets.CanchaBasketballEjemplo,
        Padel: assets.CanchaPadelEjemplo
    }

    useEffect(() => {
        if (canchas.length > 0 && deporte){
            const canchaData = canchas.filter((cancha) => cancha.deporte == deporte && cancha.id !== canchaId)
            setCanchasRelacionadas(canchaData)
        }
    },[canchas, canchaId, deporte])

  return (
    <div>
        <h1>Canchas relacionadas</h1>
        <p>Explora más canchas</p>
        <div className='canchas-card-container relacionado-container'>
            {canchasRelacionadas.slice(0,5).map((item, index) => (
                <div onClick={() => {navigate(`/cancha/${item._id}`); document.body.scrollTop = 0}} key={index} className='canchas-card'>
                    <img src={imagenes[item.deporte]} alt="" className='canchas-card-img'/>
                    <div>
                        <div>
                            <p>
                            Disponible
                            <img src={assets.disponible} alt="" className="cancha-estado" />
                            </p>
                        </div>
                        <p>{item.name}</p>
                        <p>{item.lugar}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Relacionado