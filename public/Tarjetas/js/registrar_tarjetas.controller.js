let btnRegistro = document.querySelector('#btnGuardar');

btnRegistro.addEventListener('click', obtenerDatosTarjeta);

/*Como estoy jalando usuarios, tengo que pegar el script de usuarios 
para poder obtener el tipo de usuario y meterlo al arreglo*/
function obtenerDatosTarjeta(){
    let usuario = obtenerDatoLocal('usuario');

    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);
    if (error == true) {
        mostrarMensajeModal('error formulario');
    }
    else {
        let aTarjeta = [];

        let tarjetaId = Math.random().toString(36).substring(8);
        let nombreTitutar = document.querySelector('#txtTitular').value;
        let numeroTarjeta = document.querySelector('#txtNumero').value;
        let year = document.querySelector('#txtyy').value;
        let month = document.querySelector('#txtmm').value;
        let cvv = document.querySelector('#txtcvv').value;
        let correoUsuario = usuario[5];
        let activo = '1';

        aTarjeta.push(tarjetaId, nombreTitutar, numeroTarjeta, year, month, cvv, correoUsuario, activo);
        guardarTarjeta(aTarjeta);
        limpiar();

        location.reload();
        
        }
}
function limpiar(){
    document.querySelector('#txtTitular').value = '';
    document.querySelector('#txtNumero').value = '';
    document.querySelector('#txtyy').value = '';
    document.querySelector('#txtmm').value = '';
    document.querySelector('#txtcvv').value = '';
}

/*a la hora de lista se hace una condición que si el correo del usuario loggeado es igual al
al item[6] del arreglo de tarjetas, se listarán las tarjetas*/ 
