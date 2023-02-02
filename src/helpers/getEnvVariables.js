
// archivo de las variables de entorno hace referencia a los .env
export const getEnvVariables = () => {
    
  // import.meta.env;

  return {

    VITE_API_URL: import.meta.env.VITE_API_URL,
    // aca tocaria importar todas las variables de manera globar  ya q hay problemas a la hora de compilar

    
      // ...import.meta.env,
  }
  
}
