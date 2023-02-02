import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
// estos son los apartados que se ven en el state
    name: 'auth',
    initialState: {
        // todavia no se si esta autenticado o no
        status: 'checking', //authenticated, not-authenticated
        // informacion del usuario
        user:{},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage= undefined;
         },
        //  aca la persona esta autenticada
         onLogin: (state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage= undefined;
         },
        //  si algo sale mal
         onLogout: (state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage= payload;  
         },
        //  solo es para limpiar el msj de erro
         clearErrorMessage: (state ) => {
            state.errorMessage= undefined;
         },




    }
});
export const { onChecking,onLogin,onLogout,clearErrorMessage } = authSlice.actions;