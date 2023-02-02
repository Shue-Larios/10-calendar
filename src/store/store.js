import { configureStore } from '@reduxjs/toolkit'
import { uiSlice, calendarSlice } from './'
import { authSlice } from './auth/authSlice';




export const store = configureStore({
    reducer: {
        // para utilizar nuestro Slice
        // es el nombre de como lo voy a identificar
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    // configurar middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // solo es para q revise si esas fechas se pueden serealizar
        serializableCheck: false,
    })


})