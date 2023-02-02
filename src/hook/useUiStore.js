import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();


    // para seleccionar algo del store
    const { isDateModalOpen } = useSelector(state => state.ui)

        // para abrir el modal paso 2
    const openDateModal = () => {
        // para poder llegar al store y decirle tenes q ejecutar esta accion ocupo hacr un dispatch  
        dispatch( onOpenDateModal() )
    }

          // para cerrar el modal paso 2
          const closeDateModal = () => {
            // para poder llegar al store y decirle tenes q ejecutar esta accion ocupo hacr un dispatch  
            dispatch( onCloseDateModal() )
        }
    



    return {
        // propiedades
        isDateModalOpen,

        // metodos
        openDateModal,
        closeDateModal
    }
}