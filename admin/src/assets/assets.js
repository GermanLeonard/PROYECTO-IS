import bkb from './imagenes/bkb.png'
import futbol from './imagenes/futbol.png'
import padel from './imagenes/padel.png'
import logo from './imagenes/logo.png'
import userImg from './imagenes/user.png'
import dropdownIcon from './imagenes/down-chevron.png'
import AntiguoCuscatlan from './imagenes/AntiguoCuscatlan.png'
import LosProceres from './imagenes/LosProceres.png'
import ElPlatillo from './imagenes/ElPlatillo.png'
import CanchaFutbolEjemplo from './imagenes/canchaFutbolEjemplo.jpg'
import CanchaBasketballEjemplo from './imagenes/CanchaBasketEjemplo.jpg'
import CanchaPadelEjemplo from './imagenes/CanchaPadelEjemplo.jpg'
import disponible from './imagenes/disponible.png'

export const assets = {
    bkb,
    futbol,
    padel,
    logo,
    userImg,
    dropdownIcon,
    disponible,
    CanchaBasketballEjemplo,
    CanchaFutbolEjemplo,
    CanchaPadelEjemplo
}

export const deporte = {
    futbolDeporte: 'futbol',
    basketballDeporte: 'basketball',
    padelDeporte: 'padel'
}

export const sucursal = [
    {
        id: 'fcf66e53',
        lugar: 'Antiguo Cuscatlán',
        descripcion: 'En nuestra sede de Antiguo Cuscatlán, encontrarás canchas de fútbol 6x6, básquetbol y pádel, con instalaciones diseñadas para ofrecer comodidad y calidad en cada juego. Ideales para partidos entre amigos, entrenamientos o eventos deportivos.',
        image: AntiguoCuscatlan,
        direccion: 'Calle El Roble, frente a Parque Central, La Libertad, El Salvador'
    },
    {
        id: '1b41e06f',
        lugar: 'Los Próceres',
        descripcion: 'Ubicada en Los Próceres, nuestra sede cuenta con modernas canchas de fútbol 6x6 y canchas techadas de básquetbol, perfectas para jugar en cualquier clima. Disfruta de instalaciones cómodas, con iluminación y superficies de calidad, ideales para entrenamientos y partidos entre amigos.',
        image: LosProceres,
        direccion: 'Bulevar Los Próceres, kilómetro 10, cerca de Plaza Monumental, La Libertad, El Salvador'
    },
    {
        id: '2c176394',
        lugar: 'El Platillo',
        descripcion: 'Disfruta el mejor fútbol en nuestra cancha 6x6 en El Platillo. Con césped sintético y excelente iluminación, es ideal para jugar con amigos o entrenar. ¡Reserva y ven a vivir la emoción del deporte!',
        image: ElPlatillo,
        direccion: 'Calle Principal El Platillo, contiguo a la Cancha Comunitaria, La Libertad, El Salvador'
    },
]