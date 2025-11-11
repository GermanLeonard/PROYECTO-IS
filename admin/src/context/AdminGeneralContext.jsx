import { createContext, useState } from "react"
export const AdminGeneralContext = createContext()
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminGeneralContextProvider = (props) => {
    const [adminGeneralToken, setAdminGeneralToken] = useState(localStorage.getItem('adminGeneralToken')?localStorage.getItem('adminGeneralToken'):'')
    const [canchas, setCanchas] = useState([])
    const [reservas, setReservas] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getTodasCanchas = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin-general/todas-canchas', {}, {headers:{adminGeneralToken}})
            if(data.success){
                setCanchas(data.canchas)
                console.log(data.canchas)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cambiarDisponibilidad = async (canchaId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin-general/cambiar-disponibilidad', {canchaId}, {headers: {adminGeneralToken}})
            if(data.success){
                toast.success(data.message)
                getTodasCanchas()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getTodasReservas = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin-general/ver-reservas', {headers: {adminGeneralToken}})
            if(data.success){
                setReservas(data.reservas)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        adminGeneralToken, setAdminGeneralToken, backendUrl, canchas, getTodasCanchas, cambiarDisponibilidad, reservas, setReservas, getTodasReservas
    }

    return (
        <AdminGeneralContext.Provider value={value}>
            {props.children}
        </AdminGeneralContext.Provider>
    )
}

export default AdminGeneralContextProvider