import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


// esta parte la vamos a leer del backend

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños jefe',
//     notes: 'hay que comprar el pastel',
//     start: new Date(),
//     // aca a la hora actual le agregamos dos horas
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Josue'
//     }
// }


// estos son los apartados que se ven en el state
export const calendarSlice = createSlice({
    name: 'calendar',
    // aca stoy mandando todo al state
    initialState: {
        // para dejar saber que esta cargando

        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        // para activar el evento cuando doy clic
        onSetactiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        // para añadir nuevo evento
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            //  para limpiar el evento activo
            state.activeEvent = null;
        },
        //    para actualizar el evento
        onUpdateEvent: (state, { payload }) => {
            // map regresa un nuevo arreglo basado en el valor de retorno del arreglo
            state.events = state.events.map(event => {
                // event._id === payload._id
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            });
        },
        // para eliminar el evento
        onDeleteEvent: (state) => {
            // sino tenemos ninguna nota activa
            if (state.activeEvent) {
                // regresamos todos los eventos cuyo id sea diferente al de la nota activa
                // event._id !== state.activeEvent._id
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                // para q no tengamos ninguna nota activa
                state.activeEvent = null;
            }
        },
        // para que nos permita establecer los eventos
        onLoadEvent: (state, { payload = [] }) => {
            // se cancela cuando ya tenemos los eventos
            state.isLoadingEvents = false;
            // state.events = payload;

            payload.forEach(event => {
                //    indica si el event ya existe en el store para insertarlo o no
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });

        },
        // reducer para limpiar el state.calendar al logout
        // si quiero limpiar algo del state tengo que hacer esto x cada espacio q tenga
        onLogoutCalendar: (state) => {
            // este es lo mismo q el estado inicial del  state.calendar
            state.isLoadingEvents= true,
            state.events=[],
            state.activeEvent=null
        },
    }
});
export const { onSetactiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvent,
    onLogoutCalendar,
} = calendarSlice.actions;