document.querySelector('#txtFiltro').addEventListener('keyup', mostrarMetodos);

let listaTarjetas = obtenerListaTarjeta();
let usuario = obtenerDatoLocal('usuario');
let correo = usuario[5];

mostrarMetodos();

function mostrarMetodos() {
    let sFiltro = document.querySelector('#txtFiltro').value;
    let cuerpoTabla = document.querySelector('#tblMetodos tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaTarjetas.length; i++) {
        let numero = listaTarjetas[i]['numero'];
        if (listaTarjetas[i]['activo'] == '1') {
            if (correo == listaTarjetas[i]['correo']) {
                if (numero.toString().includes(sFiltro) || listaTarjetas[i]['nombre'].toLowerCase().includes(sFiltro)) {
                    let fila = cuerpoTabla.insertRow();
                    let cTitular = fila.insertCell();
                    let cNumero = fila.insertCell();
                    let cExpiracion = fila.insertCell();
                    let cModificar = fila.insertCell();
                    let cEliminar = fila.insertCell();

                    cModificar.classList.add('acciones');
                    cEliminar.classList.add('acciones');

                    let sTitular = document.createTextNode(listaTarjetas[i]['nombre']);
                    let sNumero = document.createTextNode(listaTarjetas[i]['numero']);
                    let sExpiracion = document.createTextNode(listaTarjetas[i]['year'] + "/" + listaTarjetas[i]['month']);

                    cTitular.appendChild(sTitular);
                    cNumero.appendChild(sNumero);
                    cExpiracion.appendChild(sExpiracion);

                    //Creación del botón de editar
                    let botonEditar = document.createElement('i');
                    botonEditar.classList.add("far", "fa-edit");
                    let elementa = document.createElement('a');
                    elementa.setAttribute("href", "modificar_tarjetas.html");
                    elementa.appendChild(botonEditar);
                    elementa.addEventListener('click', redirect);
                    elementa.dataset.tarjeta = listaTarjetas[i]['id'];

                    cModificar.appendChild(elementa);



                    //Creación del botón de deshabilitar
                    let botonDeshabilitar = document.createElement('i');

                    botonDeshabilitar.classList.add("fas", "fa-times");
                    botonDeshabilitar.dataset.indice = i;
                    botonDeshabilitar.addEventListener('click', eliminar);
                    cEliminar.appendChild(botonDeshabilitar);
                }
            }
        }
    }
}

function redirect() {
    let tarjeta = this.dataset.tarjeta;
    setTemp(tarjeta);
}

function eliminar() {
    let idModificar = this.dataset.indice;
    let actualizar = [];
    swal({
            title: "¿Está seguro de eliminar la tarjeta?",
            text: "Si lo hace, el registro de la misma desaparecerá por completo",
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
                if (listaTarjetas[idModificar]['activo'] == '1') {
                    listaTarjetas[idModificar]['activo'] = '0';

                    actualizar.push(listaTarjetas[idModificar]['id'], listaTarjetas[idModificar]['nombre'], listaTarjetas[idModificar]['numero'], listaTarjetas[idModificar]['year'], listaTarjetas[idModificar]['month'], listaTarjetas[idModificar]['cvv'], listaTarjetas[idModificar]['correo'], listaTarjetas[idModificar]['activo']);

                    actualizarTarjeta(actualizar);
                    mostrarMetodos();
                }


            }
        })
}