
import React, { useState, useContext } from "react";
import "../styles/Login.css";
import { AdminGeneralContext } from "../context/AdminGeneralContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setAdminGeneralToken, backendUrl } = useContext(AdminGeneralContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (event) => {
    event.preventDefault();
    try {

      const { data } = await axios.post(
        backendUrl + "/api/admin-general/login",
        { email, password }
      );
      if (data.success) {
        localStorage.setItem("adminGeneralToken", data.token);
        setAdminGeneralToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="custom-auth-container">
      <div className="custom-auth-content">
        <form className="custom-auth-form" onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          <div className="custom-input-wrapper">
            <i className="custom-auth-icon fas fa-envelope"></i>
            <input
              className="custom-auth-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="custom-input-wrapper">
            <i className="custom-auth-icon fas fa-lock"></i>
            <input
              className="custom-auth-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-auth-button">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
