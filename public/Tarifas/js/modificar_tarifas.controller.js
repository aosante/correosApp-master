let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', registrarDatosActualizados);
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

function obtenerTarifa() {
    let tempTarifa = localStorage.getItem('tempTarifa');
    let infoTarifa = obtenerTarifaDB(tempTarifa);

    document.querySelector('#numTarifaPeso').value = infoTarifa[1];
    document.querySelector('#opSucursal').value = infoTarifa[2];
    document.querySelector('#numTarifaKm').value = infoTarifa[3];
}

obtenerTarifa();

function registrarDatosActualizados() {
    let infoTarifa = [];

    let _id = localStorage.getItem('tempTarifa');
    let tarifaPeso = document.querySelector('#numTarifaPeso').value;
    let sucursal = document.querySelector('#opSucursal').value;
    let tarifaKm = document.querySelector('#numTarifaKm').value;
    let sActivo = '1';

    infoTarifa.push(_id, tarifaPeso, sucursal, tarifaKm, sActivo);
    actualizarTarifaDB(infoTarifa);
    localStorage.removeItem('tempTarifa');
    window.location.href = 'index_listar.html'
}

