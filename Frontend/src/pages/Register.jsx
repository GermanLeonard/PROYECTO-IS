import React, { useContext, useEffect, useState } from 'react';
import '../styles/Register.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/user/registrar', {username, email, password})
      if(data.success){
        localStorage.setItem('token', data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  })

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleRegister}>
          <h1>Regístrate</h1>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required/>
          </div>
          <div className="input-wrapper">
            <i className="fas fa-envelope auth-icon"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock auth-icon"></i>
            <input
              type="password"
              placeholder="Contraseña"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>
          <p className="auth-text">Debe tener más de 8 caracteres</p>
          <button type="submit" className="auth-button">Regístrate</button>
          <a href="/login" className="auth-link">¿Ya tienes cuenta? Ingresa ahora</a>
        </form>
      </div>
    </div>
  );
};

export default Register;




