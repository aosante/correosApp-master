let tarjeta=getTemp();
let infoTarjeta=buscarTarjetaPorId(tarjeta);

obtenerTarjeta();

function obtenerTarjeta(){
    

    console.log(infoTarjeta);
    
    document.querySelector('#txtTitular').value=infoTarjeta['nombre'];
    document.querySelector('#txtNumero').value=infoTarjeta['numero'];
    document.querySelector('#txtyy').value=infoTarjeta['year'];
    document.querySelector('#txtmm').value=infoTarjeta['month'];
    document.querySelector('#txtcvv').value=infoTarjeta['cvv'];
}

let botonActualizar=document.querySelector('#btnGuardar');
botonActualizar.addEventListener('click',obtenerActualizar);


function obtenerActualizar(){

    let usuario = obtenerDatoLocal('usuario');
    let correo = usuario[5];

    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);

    if (error == true) {
        mostrarMensajeModal('error formulario');
    }
    else {
        let aNuevaTarjeta = [];
        let id = infoTarjeta['id'];

        let nombreTitutar = document.querySelector('#txtTitular').value;
        let numeroTarjeta = document.querySelector('#txtNumero').value;
        let year = document.querySelector('#txtyy').value;
        let month = document.querySelector('#txtmm').value;
        let cvv = document.querySelector('#txtcvv').value;
        let activo = '1';

        aNuevaTarjeta.push(id, nombreTitutar, numeroTarjeta, year, month, cvv, correo, activo);
        actualizarTarjeta(aNuevaTarjeta);
        removeTemp();
        
        window.location.href = '../Tarjetas/tarjetas.html';
        
    }
}

function limpiar(){
    document.querySelector('#txtTitular').value = '';
    document.querySelector('#txtNumero').value = '';
    document.querySelector('#txtyy').value = '';
    document.querySelector('#txtmm').value = '';
    document.querySelector('#txtcvv').value = '';
}
