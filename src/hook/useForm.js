import { useEffect, useMemo, useState } from 'react';



export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    
    // usamos un useState para mantener el estado
    // formValidations sirve para poder recibir las validaciones q quiero Validacion de formulario Parte 2
    const [formValidation, setFormValidation] = useState({});

    // se recomienda tenes un useEffect por cada tarea
    // la ponemos para disparar la funcion
    useEffect(() => {
        createValidators();
        // se va a disparar cada q formState cambia
    }, [formState])

    // creamos otro para la noteView y q el usefrom se actualice cada q seleccionamos una nota
    useEffect(() => {
setFormState( initialForm );

        //   cuando el initialForm cambia volvemos a ejecutar
    }, [initialForm])



    // para validar todo el formualario y deje pasar
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            // validamos
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation])


    
    // funcion que nos permtie hacer el cambio de cualquier input
    const onInputChange = ({ target }) => {
        // event.target.value para ver el valor nuevo escrito
        // event.target.name para ver que elemento esta cambian
        const { name, value } = target;
        // hacemos el cambio con llaves xk arriba tenemos como objeto
        setFormState({
            // desestructuramos el formState para mantener todos los valores dl formulario
            ...formState,
            [name]: value
        });
    }

    // funcion para limpiar los campos
    const onResetForm = () => {
        setFormState(initialForm);
    }

    // funcion para validar los campos Validacion de formulario Parte 3
    const createValidators = () => {
        const formCheckedValues = {};

        //    recorremos el arreglo de formValidations
        for (const formField of Object.keys(formValidations)) {
            // obtenemos la funcion y el msj de erro

            const [fn, errorMessage] = formValidations[formField];
            // si esta condicion se cumple en base a lo q pusismos en formValidations de registerpage agrega un null caso contrario un error

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        // este es el nuevo valor q va a tener nuestro 
        setFormValidation(formCheckedValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}







