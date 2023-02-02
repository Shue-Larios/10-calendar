import { addHours, differenceInSeconds, set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
// estos dos son para los input de datepicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hook';



// para poner los DatePicker en español
registerLocale('es', es);




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



//   esto ayuda a q se pueda sobreponer ante todo (aca ponemos el id del div principal se tiene en el index.html)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // para tomar el activeEvent
    const { activeEvent, startSavingEvent } = useCalendarStore();


    // importamos nuestro custon hook
    // para cerrar o abrir el modal
    const { isDateModalOpen, closeDateModal } = useUiStore();


    // const [isOpen, setIsOpen] = useState(true);

    // estado adicional por si el titulo esta malo
    const [formSubmitted, setformSubmitted] = useState(false)


    // para el manejo del formulario del modal
    const [formValues, setformValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        // aca a la hora actual le agregamos dos horas
        end: addHours(new Date(), 2),
    });

    // para memorizar el valor el formSubmitted esto solo ayuda para q el input se ponga en rojo 
    const titleClass = useMemo(() => {
        // si el formSubmitted no se a disparado
        if (!formSubmitted) return '';

        return (formValues.title.length >= 0)
            ? ''
            : 'is-invalid'

        // tiene q volver a memorizar el valor el title o si el setformSubmitted cambia
    }, [formValues.title, setformSubmitted])


    // para hacer los cambios de la informacion q tiene l state y el formValues
    useEffect(() => {
        // si el activeEvent no es null 
        if (activeEvent !== null) {
            // con esto esparzo las propiedades y creo un nuevo objeto
            setformValues({ ...activeEvent })
        }
    }, [activeEvent])






    // cuando el formulario se bloquea y no deja escribir hacemos esto
    const onInputChange = ({ target }) => {
        // este es el cambio del formulario en useState
        setformValues({
            // para solo sobrescribir el q tenga el valor del target
            ...formValues,
            [target.name]: target.value
        })
    }

    // para poder actualizar la fecha en el input tanto de el changing elegie entre inicio o final
    const onDateChannge = (event, changing) => {
        setformValues({
            // para solo sobrescribir el q tenga el valor del target y no sobre escribir nada
            ...formValues,
            [changing]: event
        })
    }



    // para cerrar el modal paso 3
    const onCloseModal = () => {
        // aca decimos q queremos cerrar el modal   
        closeDateModal();
    }

    // para manejar el posteo del formulario
    const onSubmit = async (event) => {
        // detenemos la propagacion del formulario
        event.preventDefault();

        // aca cuando se intento hacer el posteo del formulario
        setformSubmitted(true);
        // para no permitir que la fecha final sea menor a la inicial
        const differencee = differenceInSeconds(formValues.end, formValues.start);
        // isNaN ya viene en JS no hay q importarla
        if (isNaN(differencee) || differencee <= 0) {
            //    alerta de sweetAlert2 la primera es el titulo segundo el contenido y la ultima coma es el icono
            Swal.fire('Fechas Incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        //  si en el titulo no escribo nada evita q se mande el formulario
        if (formValues.title.length <= 0) return;

        // caso contrario si todo esta bien
        // console.log(formValues);

        // TODO
        await startSavingEvent(formValues)
        // cerrar modal
        closeDateModal();
        // Remover errores en pantalla
        setformSubmitted(false);
    }



    return (
        <Modal
            // este ayuda abrir la ventana modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            // la clase q le quiero poner al fondo
            overlayClassName='modal-fondo'
            // esto es para q el modal de chanse a la animacion
            closeTimeoutMS={200}
        >

            {/* puro contenido html dentro del modal */}
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    <DatePicker
                        // clase que ayuda hacer mas grande el input
                        className='form-control'
                        selected={formValues.start}
                        onChange={(event) =>
                            onDateChannge(event, 'start')}
                        // el formato de la fecha en este caso que salga la hora
                        dateFormat='Pp'
                        // para q seleccionemos los minutos y segundos
                        showTimeSelect
                        // para poner en español junto con las cosas arriba
                        locale="es"
                        // poner el campo hora en español
                        timeCaption='Hora'

                    />

                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    <DatePicker
                        // fecha minima posible de seleccionar
                        minDate={formValues.start}
                        // clase que ayuda hacer mas grande el input
                        className='form-control'
                        selected={formValues.end}
                        onChange={(event) =>
                            onDateChannge(event, 'end')}
                        dateFormat='Pp'
                        // para q seleccionemos los minutos y segundos
                        showTimeSelect
                        // para poner en español junto con las cosas arriba
                        locale="es"
                        // poner el campo hora en español
                        timeCaption='Hora'

                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>


        </Modal>
    )
}
