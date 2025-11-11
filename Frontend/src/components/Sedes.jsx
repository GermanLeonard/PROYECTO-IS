import React from 'react'
import '../styles/Sedes.css'
import { sucursal } from '../assets/assets' 
import { Link } from 'react-router-dom'

const Sedes = () => {
  return (
    <div className='sedes' id='sedes'>
        <h3>Sedes</h3>
        <p className='sedes-info'>En nuestras modernas sedes deportivas, ofrecemos instalaciones de primer nivel para que disfrutes del fútbol, básquetbol y pádel en un entorno <b>seguro</b> y <b>profesional</b>. Cada sede cuenta con canchas de calidad, vestuarios completos, áreas de descanso y amplios estacionamientos. Nos enorgullece crear espacios accesibles para todos, tanto para entrenamientos como para competencias.</p>
        <div className='sedes-card-container'>
            {sucursal.map((item, index) => (
                index % 2 === 0 ? (
                    <div className='sedes-card' key={index}>
                        <div>
                            <h4>{item.lugar}</h4>
                            <p>{item.descripcion}</p>
                            <Link to={`/reserva/${item.id}`}>
                                <button>Reserva</button>
                            </Link>
                        </div>
                        <div>
                            <img src={item.image} alt="" />
                        </div>
                    </div>
                ) : <>
                    <div className='sedes-card' key={index}>
                        <div>
                            <img src={item.image} alt="" />
                        </div>
                        <div>
                            <h4>{item.lugar}</h4>
                            <p>{item.descripcion}</p>
                            <Link to={`/reserva/${item.id}`}>
                                <button>Reserva</button>
                            </Link>
                        </div>
                    </div>
                </>                
            ))}
        </div>
    </div>
  )
}

export default Sedes