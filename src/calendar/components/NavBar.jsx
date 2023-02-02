import Swal from "sweetalert2";
import { useAuthStore } from "../../hook/useAuthStore";


export const NavBar = () => {

    const { startLogout, user } = useAuthStore();

    const logout = () =>{
        Swal.fire({
            title: 'Estas seguro',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            // si da confirmar entoncs q salga
            if (result.isConfirmed) {
                startLogout();
            }
          })
    }



    return (
        <>
            <div className="navbar navbar-dark bg-dark mb-4 px-4">
                <span className="navbar-brand">
                    {/* linea par usar los iconos de font-awesome */}
                    <i className="fas fa-calendar-alt"></i>
                    {/* para hacer una separacion entre el logo y el nombre */}
                    &nbsp;
                    { user.name }
                </span>


                <button className="btn btn-outline-danger" onClick={ logout }>
                    {/* linea par usar los iconos de font-awesome */}

                        <i className="fas fa-sign-out-alt"></i>
                    <span>
                        &nbsp;
                        Salir </span>
                </button>




            </div>



        </>
    )
}
