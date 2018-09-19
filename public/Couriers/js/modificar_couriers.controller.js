let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', registrarDatosActualizados);

obtenerCourier();

function obtenerCourier() {
    let sCourier = getTemp();
    let infoCourier = buscarCourierPorId(sCourier);

    document.querySelector('#numCourier').value = infoCourier['numero'];
    document.querySelector('#numCourier').disabled = true;    
    document.querySelector('#txtNombre').value = infoCourier['nombre'];
}

function registrarDatosActualizados() {
    let courier = [];

    let numero = document.querySelector('#numCourier').value;

    let nombre = document.querySelector('#txtNombre').value;
    let activo = '1';

    courier.push(numero, nombre, activo);
    actualizarCourier(courier);
    removeTemp();
    window.location.href = 'listar_courier.html';
}
