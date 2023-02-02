import { useUiStore, useCalendarStore } from "../../hook";



export const FabADelete = () => {
  // para abrir el modal
  const { startDeletingEvent,hasEventSelected } = useCalendarStore();

 
  const handleDelete = () => {
// todo llegar al backend
    startDeletingEvent();
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      // dos formas de ocultar el boton
      // disabled= { !hasEventSelected }
      style={{
        display: hasEventSelected ? '': 'none'
      }}
      >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
