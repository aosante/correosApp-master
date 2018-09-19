var listaClientes = obtenerListaDB('all_users_by_type?type=2');
var usuario = obtenerDatoLocal('usuario');
document.querySelector('#txtFiltro').addEventListener('keyup', mostrarClientes());
mostrarClientes();

if (usuario[17] === '4') {
    listaClientes = listaClientes.filter(function (cliente) {
        return cliente[15] === usuario[15];
    });
};

function mostrarClientes() {
    let tbody = document.querySelector('#tblClientes tbody');
    let sFiltro = document.querySelector('#txtFiltro').value;
    tbody.innerHTML = '';

    for (let i = 0; i < listaClientes.length; i++) {
        var activo = listaClientes[i].length-1;
        if (listaClientes[i][activo] === '1') {
            if (listaClientes[i][0].toLowerCase().includes(sFiltro) || listaClientes[i][2].toLowerCase().includes(sFiltro) || listaClientes[i][5].toLowerCase().includes(sFiltro)) {
                let fila = tbody.insertRow();

                let cPrimerNombre = fila.insertCell();
                let cPrimerApellido = fila.insertCell();
                let cCorreo = fila.insertCell();
                let cTelefono = fila.insertCell();

                let cEditar = fila.insertCell();
                let cDesactivar = fila.insertCell();

                cEditar.classList.add('acciones');
                cDesactivar.classList.add('acciones');

                cPrimerNombre.appendChild(document.createTextNode(listaClientes[i][0]));
                cPrimerApellido.appendChild(document.createTextNode(listaClientes[i][2]));
                cCorreo.appendChild(document.createTextNode(listaClientes[i][5]));
                cTelefono.appendChild(document.createTextNode(listaClientes[i][7]));

                let atag = document.createElement('a');
                atag.setAttribute('href', "editarClientes.html");

                let botonEditar = document.createElement('i');
                botonEditar.classList.add("far", "fa-edit");

                atag.appendChild(botonEditar);
                atag.dataset.correo = listaClientes[i][5];
                cEditar.appendChild(atag);

                atag.addEventListener('click', redirect);

                let botonDesactivar = document.createElement('i');
                botonDesactivar.classList.add("fas", "fa-times");
                botonDesactivar.dataset.correo = listaClientes[i][5];
                botonDesactivar.addEventListener('click', eliminarCliente);
                cDesactivar.appendChild(botonDesactivar);
            }
        }
    }
}

mostrarClientes();

function redirect() {
    let sCorreo = this.dataset.correo;
    localStorage.setItem('tempCliente', sCorreo);
}

function eliminarCliente(){
    let correo = this.dataset.correo;
    var userEliminar = [];
    swal({
        title: "¿Está seguro de desactivar al cliente?",
        text: "Si lo hace, el registro del cliente desaparecerá por completo",
        icon: "warning",
        buttons: {
            catch: {
                text: 'Eliminar',
                value: 'Eliminar',
                className: 'button',
            },
            cancel: 'Cancelar'
        },
    })
    .then((botonUsuario) => {
        if (botonUsuario === "Eliminar") {
            let listaClientes = obtenerUsuarioDB(correo);

            actualizarUsuario(correo);
        }
        mostrarClientes();
    });
};
