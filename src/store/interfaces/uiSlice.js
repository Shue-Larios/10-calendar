

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        // para abrir el modal paso 1
        onOpenDateModal: (state, /* action */ ) => {
            state.isDateModalOpen= true;
         },
        // para cerrar el modal paso 1
         onCloseDateModal: (state, /* action */ ) => {
             state.isDateModalOpen= false;
       },
    }
});
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;