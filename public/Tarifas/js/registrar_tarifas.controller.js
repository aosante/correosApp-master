document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
var listaSucursales = obtenerListaSucursales();

function agregarSucursales() {
    for(let i = 0; i < listaSucursales.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = listaSucursales[i][1];
        opcion.innerText = listaSucursales[i][1];
        document.getElementById('opSucursal').appendChild(opcion);
    }
}

agregarSucursales();

function obtenerDatos() {
    let inputs = document.querySelectorAll('input:required, select:required');
    let error = validarInputsRequeridos(inputs);

    if(error == true) {
        mostrarMensajeModal('error formulario');
    }
    else {
        let tarifa = [];

        let tarifaPeso = document.querySelector('#numTarifaPeso').value;
        let sucursalElegida = document.querySelector('#opSucursal').value;
        let tarifaKm = document.querySelector('#numTarifaKm').value;
        let sActivo = '1';

        tarifa.push(tarifaPeso, sucursalElegida, tarifaKm, sActivo);
        guardarTarifaDB(tarifa);
        limpiar();
        mostrarMensajeModal('registro exitoso');
    }
}

function limpiar() {
    document.querySelector('#numTarifaPeso').value = '';
    document.querySelector('#numTarifaKm').value = '';
}
