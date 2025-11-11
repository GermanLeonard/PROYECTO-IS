import React from 'react'
import '../styles/Nosotros.css'
import image from '../assets/imagenes/image.png'; 
import { sucursal } from '../assets/assets' 
import { Link } from 'react-router-dom'

const Nosotros = () => {
  return (
    <div className='nosotros' id='nosotros'>
      <h3>Nosotros</h3>
      <div className='cuadro'>
        <div className='info-container'>
          <div>
            <p>
              En <span>Sport Spot</span>, somos tres jóvenes universitarios apasionados por el deporte y la tecnología. Creamos esta plataforma con la visión de facilitar el acceso a canchas deportivas de calidad, permitiéndote reservar de manera rápida y sencilla.
              <br /><br />
              Sabemos lo importante que es encontrar el espacio ideal para cada partido, por eso nos esforzamos en ofrecerte opciones accesibles y variadas para fútbol, pádel y básquetbol. Con <span>Sport Spot</span>, cada reserva es un paso más hacia una experiencia deportiva memorable.
            </p>
          </div>
          <div>
            <p>
              En <span>Sport Spot</span> creemos que el deporte debe ser accesible y fácil de disfrutar. Nos enfocamos en construir una comunidad donde jugadores de todos los niveles puedan encontrar su lugar en la cancha, desde aficionados hasta expertos. Nuestra plataforma intuitiva está diseñada para que reservar una cancha sea sencillo, rápido y cómodo.
              <br /><br />
              Únete a <span>Sport Spot</span> y forma parte de esta comunidad de deportistas conectados y apasionados. ¡Nos vemos en la cancha!
            </p>
          </div>
        </div>
        <img src={image} alt="Deporte" className='imagen-deporte' /> {/* Imagen añadida */}
      </div>
    </div>
  );
};

export default Nosotros