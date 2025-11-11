  import React, { useContext, useEffect } from 'react'
  import { AdminGeneralContext } from '../../context/AdminGeneralContext'
  import { assets } from '../../assets/assets'
  import '../../styles/Lista.css'

  const ListaCanchas = () => {
    const {canchas, adminGeneralToken, getTodasCanchas, cambiarDisponibilidad} = useContext(AdminGeneralContext)
    const imagenes = {
      Futbol: assets.CanchaFutbolEjemplo,
      Basketball: assets.CanchaBasketballEjemplo,
      Padel: assets.CanchaPadelEjemplo
    }

    useEffect(() => {
      if(adminGeneralToken){
        getTodasCanchas()
      }
    },[adminGeneralToken])

    return (
      <div className='lista'>
        <h1>Todas las Canchas</h1>
        <div className='canchas-card-container'>
          {
            canchas.map((item, index) => (
              <div key={index} className='canchas-card'>
                <img src={imagenes[item.deporte]} alt="cancha" className='canchas-card-img'/>
                <div>
                  <p>{item.name}</p>
                  <p>{item.lugar}</p>
                  <div>
                    <input onChange={() => cambiarDisponibilidad(item._id)} type="checkbox" checked={item.disponible}/>
                    <p>Disponible</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  export default ListaCanchas