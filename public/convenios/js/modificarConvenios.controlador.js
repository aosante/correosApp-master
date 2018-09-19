let botonActualizar=document.querySelector('#btnGuardar');
botonActualizar.addEventListener('click',obtenerActualizar);

obtenerConvenio();

function obtenerConvenio(){
    let _Id=getTemp();
    let infoConvenio=buscarConvenio(_Id);

    console.log(infoConvenio);
    
    document.querySelector('#txtNombre').value=infoConvenio['nombre'];
    document.querySelector('#txtDescripcion').value=infoConvenio['descripcion'];
}

function obtenerActualizar() {
        
        let id = getTemp();
        let nombre = document.querySelector('#txtNombre').value;
        let descripcion = document.querySelector('#txtDescripcion').value;
        let activo = '1';

        let aNuevoConvenio = [id, nombre, descripcion, activo];
        actualizarConvenio(aNuevoConvenio);
        removeTemp();
        window.location.href = 'ListarConvenios.html'

    }