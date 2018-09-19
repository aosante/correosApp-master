let listarEncAduana = obtenerListaDB('all_users_by_type?type=3');
document.querySelector('#txtFiltro').addEventListener('keyup', mostrarEncargadoAduana );

mostrarEncargadoAduana();

function mostrarEncargadoAduana() {
    let tbody = document.querySelector('#tblListaEncargadoAduana tbody');
    let sfiltro = document.querySelector('#txtFiltro').value;

    tbody.innerHTML = '';

    for (let i =0; i<listarEncAduana.length;i++) {
        var activo = listarEncAduana[i].length-1;  
        if (listarEncAduana[i][activo] === '1') {
            if(listarEncAduana[i][0].toLowerCase().includes(sfiltro)||listarEncAduana[i][1].toLowerCase().includes(sfiltro) ||listarEncAduana[i][2].toLowerCase().includes(sfiltro)||listarEncAduana[i][3].includes(sfiltro)|| listarEncAduana[i][4].includes(sfiltro)) {
                let fila= tbody. insertRow();// CREA FILAS

                let sPrimerNombre = fila.insertCell(); //INSERT EN LA FIL EN LA POS 0 EL NOMBRE
                let sPrimerApellido = fila.insertCell();
                let sCorreo = fila.insertCell();
                let sTelefono = fila.insertCell();
                let sCedula = fila.insertCell();
                let sModificar = fila.insertCell();
                let sDesactivar = fila.insertCell();                      


                sPrimerNombre.appendChild(document.createTextNode(listarEncAduana[i][0]));
                sPrimerApellido.appendChild(document.createTextNode(listarEncAduana[i][2]));
                sTelefono.appendChild(document.createTextNode(listarEncAduana[i][7]));
                sCedula.appendChild(document.createTextNode(listarEncAduana[i][4]));
                sCorreo.appendChild(document.createTextNode(listarEncAduana[i][5]));

                let botonModificar =document.createElement('i');
                botonModificar.classList.add("far" , "fa-edit");

                
                let botonDesactivar =document.createElement('i');
                botonDesactivar.classList.add("fas", "fa-times");


                let elementA = document.createElement('a');
                elementA.setAttribute("href" , "modificarEncargadoAduana.html")
                elementA.appendChild(botonModificar);

                elementA.addEventListener('click' , redirect);
                elementA.dataset.correo = listarEncAduana[i][5];

                sModificar.appendChild(elementA);
                elementA.appendChild(botonModificar);
                sModificar.classList.add('acciones');

                sDesactivar.appendChild(botonDesactivar);
                sDesactivar.classList.add('acciones');


                botonDesactivar.dataset.correo = listarEncAduana[i][5];
                botonDesactivar.addEventListener('click', eliminarEAduana);

                sDesactivar.classList.add('iconos');
            }
        }
    }
}


function redirect() {
    let correo = this.dataset.correo;
    localStorage.setItem('tempEncAduanas', correo);
}

function eliminarEAduana(){
    let correo = this.dataset.correo;
    var userEliminar = [];
    swal({
        title: "¿Está seguro de desactivar Encargado de Aduanas?",
        text: "Si lo hace, el registro de Encargado de aduanas desaparecerá por completo",
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
            let listaEAduanas = obtenerUsuarioDB(correo);

            actualizarUsuario(correo);
        }
        mostrarEncargadoAduana();
    });
};