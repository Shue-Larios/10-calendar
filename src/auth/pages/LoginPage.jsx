
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hook';
import './LoginPage.css';


// dos formas para mantener el registro y el login

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
}


const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",

}



export const LoginPage = () => {

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  // el estado del formulario
  // el estado inicial del formulario es loginFormFields
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  // la funcion de mandar el formulario de login
  const loginSubmit = (event) => {
    event.preventDefault();
    // para ver los datos recibidos del formulario NO BORRAR
    // console.log({ loginEmail, loginPassword});
    startLogin({ email: loginEmail, password: loginPassword });
  }

  // la funcion de mandar el formulario de registro
  const registerSubmit = (event) => {
    event.preventDefault();
    // si las contraseñas son diferentes
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en el registro', 'las contraseñas no coinciden', 'error')
      return // para que no lo siga ejecutando
    }
    // aca ya hizo el guardado en la base
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  }


  
  // para estar pendiente de los cambios en el errorMessage
  // para mostrar una alerta en pantalla
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la Autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="d-grid gap-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}