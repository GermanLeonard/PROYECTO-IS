import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const moneda = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [canchas, setCanchas] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

    const getCanchasData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/cancha/lista')
            if (data.success){
                setCanchas(data.canchas)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCanchasData()
    },[])

    const value = {
        canchas, getCanchasData, moneda, token, setToken, backendUrl
    }

    useEffect(() => {
        if(token){

        }else{
            
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider