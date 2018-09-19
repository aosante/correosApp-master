document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

function obtenerDatos() {
    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);
    if(error == true) {
        mostrarMensajeModal('error formulario');
    }//if
    else {
        let couriers = [];

        let numero = document.querySelector('#numCourier').value;
        let nombre = document.querySelector('#txtNombre').value;
        let activo = '1';


        couriers.push(numero, nombre, activo);
        guardarCourier(couriers);
        guardarDatoLocal('listaCouriersLS', couriers);
        mostrarMensajeModal('registro exitoso');
        limpiar();
    }//else
}//function


function limpiar() {
    document.querySelector('#txtNombre').value = '';
}
