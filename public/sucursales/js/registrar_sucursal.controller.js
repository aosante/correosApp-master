

document.querySelector('#btnRegistrar').addEventListener('click', registrar);

function registrar() {
    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);
    
    if (error == true) {
        mostrarMensajeModal('error formulario');
    } else {
        let infoSucursal = [];
        
        let sSucursal = document.querySelector('#numSucursal').value;
        let sDireccion = document.querySelector('#txtDireccion').value;
        let sTelefono = document.querySelector('#txtTelefono').value;
        let activo = '1';

        infoSucursal.push(sSucursal, sDireccion, sTelefono, activo);
        guardarSucursal(infoSucursal);
        guardarDatoLocal('RegistroLS',infoSucursal);
        limpiar();

        mostrarMensajeModal('registro exitoso');
    }
}

function limpiar() {
    document.querySelector('#txtDireccion').value = '';
    document.querySelector('#txtTelefono').value = '';
}

