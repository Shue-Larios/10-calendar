// cualquier interaccion que voy hacer con mi store lo hare con este hook

import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetactiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";




export const useCalendarStore = () => {

  const dispatch = useDispatch();


  // lo primero q va hacer es tomar los eventos del state
  const { events, activeEvent } = useSelector(state => state.calendar);
  // para tomar el user
  const { user } = useSelector(state => state.auth);

  // para activar el evento cuando doy clic
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetactiveEvent(calendarEvent));
  }


  // inicializa el proceso de grabacion
  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend

    // valida si nosotros fuimos el creador de la nota
    try {
      // Todo bien
      // calendarEvent._id
      if (calendarEvent.id) {
        // Actualizando al backend
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return
      }
      // creando
      // para llegar al backend
      // me trae toda la data del backend
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      // console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  // para iniciar el proceso de eliminar
  const startDeletingEvent = async () => {
    //TODO: llegar al backend
    // console.log(activeEvent.id); trae el id del evento q solamente eso ocupo para borrar
    try {
      // Todo bien
      // eiminar en el backend
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      return
      // el error lo manda el back sino fuimos nosotros q creamos la nota tira el error
    } catch (error) {
      // console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }

  }

  // para cargar los eventos del back
  const startLoadingEvents = async () => {
    // como puede fallar
    try {
      // para llegar al back
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvent(events));
      // console.log(events);
    } catch (error) {
      console.log('Error cargando eventos');
      // console.log(error);
    }
  }



  return {
    // propiedades
    events,
    activeEvent,
    // si tengo una nota activa tengo un objeto sino tengo un null eso de null lo hago aca
    // si es null regresa un false
    hasEventSelected: !!activeEvent,

    // metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}