
obtenerTipoArticulo();

function obtenerTipoArticulo() {
    let tempArticulo = localStorage.getItem('tempArticulo');
    let infoArticulo = obtenerTipoArticuloDB(tempArticulo);

    document.querySelector('#txtCategoria').value = infoArticulo[1];
    document.querySelector('#txtImpuestos').value = infoArticulo[2];
}

let botonActualizar = document.querySelector('#btnGuardar');
botonActualizar.addEventListener('click', obtenerActualizar);

function obtenerActualizar() {
    let inputs = document.querySelectorAll('inputs:required');
    let error = validarInputsRequeridos(inputs);
    if(error == true) {
        mostrarMensajeModal('error registro');
    }
    else {

        let aArticulos = [];

        let _id = localStorage.getItem('tempArticulo');

        let inputCategoria = document.querySelector('#txtCategoria');
        let sCategoria = inputCategoria.value;

        let inputImpuestos = document.querySelector('#txtImpuestos');
        let sImpuestos = inputImpuestos.value;

        let sActivo = '1';

        aArticulos.push(_id, sCategoria, sImpuestos, sActivo);
        
        actualizarTipoArticuloDB(aArticulos);
        localStorage.removeItem('tempArticulo');
        window.location.href = 'listar_tiposArticulo.html';
    }
}

