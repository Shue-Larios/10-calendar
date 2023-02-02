// tiene como objetivo realizar cualquier interaccion con la parte del auth en nuestro store

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //////////////////////////////////////


    // proceso de login que llega al backend
    const startLogin = async ({ email, password }) => {
        // console.log(email, password);
        // aca ponemos la aplicacion en un estado de carga
        dispatch(onChecking());
        // como esto puede fallar

        try {
            // como es peticion post se lo dejo saber como el resto d la url esta configurado en el env
            // ojo aca con la forma de nombrar el calendarApi en el archivo de barril
            const { data } = await calendarApi.post('/auth', { email, password });
            // aca guardamos el token de la data en el localStorage en el campo token
            localStorage.setItem('token', data.token);
            // aca guardamos a q hora se genero el token x decirlo y no vamos a consultar hasta el backend
            localStorage.setItem('token-init-date', new Date().getTime());
            // aca ponemos la aplicacion ya autenticada 
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {   // aca es cualquier tipo de error q nos mande el backend
            console.log(error);
            dispatch(onLogout(error.response.data?.msg || '')); // esto es lo q mostramos en pantalla el resto esta en loginPage.jsx
            //    para que esto se dispare cuando pase el tiempo limpia el msj de error
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    /////////////////////////////////////


    // proceso de registro que llega al backend
    const startRegister = async ({ name, email, password }) => {
        // console.log(email, password);
        // aca ponemos la aplicacion en un estado de carga
        dispatch(onChecking());

        // como esto puede fallar
        try {
            // como es peticion post se lo dejo saber como el resto d la url esta configurado en el env
            // ojo aca con la forma de nombrar el calendarApi en el archivo de barril
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            // aca guardamos el token de la data en el localStorage en el campo token
            localStorage.setItem('token', data.token);
            // aca guardamos a q hora se genero el token x decirlo y no vamos a consultar hasta el backend
            localStorage.setItem('token-init-date', new Date().getTime());
            // aca ponemos la aplicacion ya autenticada 
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {   // aca es cualquier tipo de error q nos mande el backend
            //para obtener el msj que viene desde el backend
            dispatch(onLogout(error.response.data?.msg || '')); // esto es lo q mostramos en pantalla el resto esta en loginPage.jsx
            //    para que esto se dispare cuando pase el tiempo limpia el msj de error
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    // si quiero verificar si esta autenticado o no con el token
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        // sino existe el token
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');
            // si todo sale bien vamos a tener un nuevo token
            // aca guardamos el token de la data en el localStorage en el campo token
            localStorage.setItem('token', data.token);
            // aca guardamos a q hora se genero el token x decirlo y no vamos a consultar hasta el backend
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            // limpiamos el localStorage xk el token almacenado ya no funciona
            localStorage.clear;
            dispatch(onLogout());
        }

    }

    // para cerrar la sesion
    const startLogout = () => {
        // limpiamos todo el localStorage para no tener el token
        localStorage.clear;
        dispatch(onLogout());
        dispatch(onLogoutCalendar());
    }



    return {
        // propiedades
        status,
        user,
        errorMessage,

        // metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
