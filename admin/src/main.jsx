import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AdminGeneralContextProvider from './context/AdminGeneralContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminGeneralContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
  </AdminGeneralContextProvider>
  </BrowserRouter>,
)
