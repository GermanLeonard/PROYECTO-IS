import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminGeneralContext } from "./context/AdminGeneralContext";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate} from "react-router-dom";
import EstadisticasGeneral from "./pages/adminGeneral/EstadisticasGeneral";
import AgregarCancha from "./pages/adminGeneral/AgregarCancha";
import ListaTodasCanchas from "./pages/adminGeneral/ListaTodasCanchas";
import "./styles/Sidebar.css";
import VerReservas from './pages/adminGeneral/VerReservas'

const App = () => {
  const { adminGeneralToken } = useContext(AdminGeneralContext);
  return (
    <div>
      <ToastContainer />
      <div className="admin-page">
        {adminGeneralToken ? (
          <>
            <Sidebar />
            <Routes>
              {/* Rutas para AdminGeneral */}
              {adminGeneralToken && (
                <>
                  <Route path="/admin-reservas" element={<VerReservas />} />
                  <Route
                    path="/admin-estadisticas"
                    element={<EstadisticasGeneral />}
                  />
                  <Route
                    path="/admin-agregar-cancha"
                    element={<AgregarCancha />}
                  />
                  <Route
                    path="/admin-lista-canchas"
                    element={<ListaTodasCanchas />}
                  />
                </>
              )}
              {/* Redirección predeterminada en caso de token válido */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      adminGeneralToken
                        ? "/admin-reservas"
                        : "/admin-sede-reservas"
                    }
                  />
                }
              />
            </Routes>
          </>
        ) : (
          <Routes>
            {/* Redirigir al login si no hay token */}
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
