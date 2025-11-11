
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import MisReservas from './pages/MisReservas';
import Reserva from './pages/Reserva'
import Navbar from './components/Navbar';
import Cancha from './pages/Cancha'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/mis-reservas' element={<MisReservas />}></Route>
        <Route path='/reserva' element={<Reserva />}></Route>
        <Route path='/reserva/:sucursal' element={<Reserva />}></Route>
        <Route path='/cancha/:canchaId' element={<Cancha />}></Route>
      </Routes>
    </div>
  );
}

export default App;






