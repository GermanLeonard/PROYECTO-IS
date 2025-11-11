import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminGeneralContext } from '../context/AdminGeneralContext';
import '../styles/Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { adminGeneralToken, setAdminGeneralToken } = useContext(AdminGeneralContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (adminGeneralToken) {
      setAdminGeneralToken('');
      localStorage.removeItem('adminGeneralToken');
    }
  };

  return (
    <div className="opciones-container reservas-page">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={assets.logo} alt="Sport Spot Logo" className="logo" />
          <h2>SPORT SPOT</h2>
        </div>
        <p>{adminGeneralToken ? 'Administrador General' : 'Administrador de Sede'}</p>
        <nav className="menu">
          <NavLink
            to={adminGeneralToken ? '/admin-reservas' : '/admin-sede-reservas'}
            className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
          >
            <i className="fas fa-eye"></i>
            <span>Ver Reservas</span>
          </NavLink>
          <NavLink
            to={adminGeneralToken ? '/admin-lista-canchas' : '/admin-sede-lista-canchas'}
            className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
          >
            <i className="fas fa-futbol"></i>
            <span>Ver Canchas</span>
          </NavLink>
          {adminGeneralToken && (
            <NavLink
              to={'/admin-agregar-cancha'}
              className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
            >
              <i className="fas fa-plus-circle"></i>
              <span>Agregar Cancha</span>
            </NavLink>
          )}
        </nav>
        <button className="back-button" onClick={logout}>
          <i className="fas fa-arrow-left"></i> Regresar
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;


