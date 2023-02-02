import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hook";



export const FabAddNew = () => {
  // para abrir el modal
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();



  const handleClickNew = () => {
    // para limpiar la nota anterior
    setActiveEvent({
      // sino tengo un id es xk stoy creando una nueva
      title: '',
      notes: '',
      start: new Date(),
      // aca a la hora actual le agregamos dos horas
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        // _id: '123',
        id: '123',
        name: 'Josue'
      }
    });

    // al dar clic abre el modal
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  )
}
