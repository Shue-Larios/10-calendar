// en esta carpeta van los end point son como las url

import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
baseURL: VITE_API_URL,
})


// TODO: configurar interceptores
// nos permiten interceptar las peticiones que va o regresan del backend
// instancia de axios
// es de request xk stoy haciendo peticion
calendarApi.interceptors.request.use( config =>{

    config.headers ={
        ...config.headers,
        // este es un header personalizado
        // primero como lo definimos en el back y dspues  como se llama en el localStorage
        // todas las peticiones mandan este token
        'x-token': localStorage.getItem('token')
    }

    return config
} )


export default calendarApi;







