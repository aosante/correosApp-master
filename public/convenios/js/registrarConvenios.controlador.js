let botonGuardar = document.querySelector("#btnGuardar");
botonGuardar.addEventListener('click', obtenerConvenio);


function obtenerConvenio(){
    let inputs = document.querySelectorAll('input:required');
    let bError = validarInputsRequeridos(inputs);
    if (bError == true) {
        mostrarMensajeModal('error formulario')
    }
    else {
        let aNuevoConvenio = [];
        let aNuevoConvenio2 = [];
        let valido = true;
        let convenioId = Math.random().toString(36).substring(8);
        let activo = '1';

        let nombre = document.querySelector('#txtNombre').value;
        let descripcion = document.querySelector('#txtDescripcion').value;

        aNuevoConvenio.push(convenioId, nombre, descripcion, activo);
        aNuevoConvenio2.push(nombre, descripcion, activo);
        guardarDatoLocal('listaConveniosLS', aNuevoConvenio); 

        guardarConvenio(aNuevoConvenio2);
        limpiar();

        mostrarMensajeModal('registro exitoso');
    }
}
function limpiar(){
    document.querySelector('#txtNombre').value = "";
    document.querySelector('#txtDescripcion').value = "";
}