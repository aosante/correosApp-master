document.querySelector('#btnRegistrar').addEventListener('click', registrar);

function registrar() {
    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);

    if (error == true) {
        mostrarMensajeModal('error formulario');
    } else {
        let aRegistroArticulos = [];
        let sCategoria = document.querySelector('#txtCategoria').value;
        let sImpuestos = document.querySelector('#txtImpuestos').value;
        let sActivo = '1';

        aRegistroArticulos = [sCategoria, sImpuestos, sActivo];

        guardarTipoArticuloDB(aRegistroArticulos);
        mostrarMensajeModal('registro exitoso');
        limpiar();
    }
}

function limpiar() {
    document.querySelector('#txtCategoria').value = '';
    document.querySelector('#txtImpuestos').value = '';
};
