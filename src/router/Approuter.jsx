import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { getEnvVariables } from "../helpers"
import { useAuthStore } from "../hook"

export const Approuter = () => {

  const { status, checkAuthToken } = useAuthStore();

  //const authStatus = 'not-authenticated'

  useEffect(() => {
    checkAuthToken();
  }, [])

  if ( status === 'checking' ) {
    return (
        <h3>Cargando...</h3>
    )
}

  return (
    <Routes>
      {
        // sino estoy autenticado
        (status === 'not-authenticated')
          //  cualquier ruta q entre al / va a mostrar el elemento 
          // ruta de autenticacion
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              {/* si es una ruta no reconocida */}
              <Route path="/*" element={<Navigate to='/auth/login' />} />
            </>
          )
          // cualquier otra ruta q no sea la de arriba va a entrar a esta 
          // ruta del calendario
          : (
            <>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>

  )
}
