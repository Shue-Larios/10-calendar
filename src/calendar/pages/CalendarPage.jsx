// dateFnsLocalizer ayuda a poner el idioma q se necesita
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { getMessagesES, localizer } from '../../helpers'
import { useEffect, useState } from 'react'
import { CalendarModal, FabAddNew, NavBar, CalendarEvent, FabADelete } from '../'
import { useAuthStore, useUiStore } from '../../hook'
import { useCalendarStore } from '../../hook/useCalendarStore'
import { useSelector } from 'react-redux'



// es un arreglo de eventos
// lo pasamos a calendarSlice xk lo vamos a leer del backend
// const events = [
//   {
//   title: 'Cumpleaños jefe',
//   notes: 'hay que comprar el pastel',
//   start: new Date(),
//   // aca a la hora actual le agregamos dos horas
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Josue'
//   }
// }
// ]

export const CalendarPage = () => {


  // const {  } = useSelector()
  const { user } = useAuthStore();


  // importamos cuestro custon hook
  // para abrir el modal paso 3
  const { openDateModal, closeDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // para almacenar la vista y cuando recargue el navegador este ahi si devuelve defaul me lo muestra en mes
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');


  const eventStyleGetten = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    // opaca mas el color del evento en e calendario
    // este es el estilo que le stooy aplicando a cada evento
    const style = {
      // si es un evento mio muestro el color del ? sino el del :
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }


  // vamos a escribir 3 eventos
  const onDoubleClick = (event) => {
    // mandamos a llamar el metodo
    openDateModal();
  }

  // para activar el evento cuando doy clic
  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  }

  // cuando cambia la vista (mes, semana, dia )
  const onViewChanged = (event) => {
    // el valor q va a tener es el evento
    localStorage.setItem('lastView', event)
    // setlastView(event);
  }


  // para disparar el startLoadingEvents
  useEffect(() => {
    startLoadingEvents();
  }, [])


  return (
    <>
      <NavBar />

      {/* aca ponemos todo el calendario */}
      <Calendar
        // para ayudar con el idioma
        culture='es'
        localizer={localizer}
        events={events}
        // para mostrar la vista por defecto
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        // para q tome el resto de la pantalla
        style={{ height: 'calc( 100vh - 80px)' }}
        // para cambiar el idioma del resto de cosas
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetten}
        // aca podemos especificar un objeto en el cual tenemos todos los eventos
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

      />


      <CalendarModal />
      {/* para agregar el boton de nuevo */}
      <FabAddNew />
      <FabADelete />
    </>

  )
}


