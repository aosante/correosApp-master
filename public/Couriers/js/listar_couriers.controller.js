document.querySelector('#txtFiltro').addEventListener('keyup', mostrarCouriers);
let listaCouriers = obtenerListaCourier();


mostrarCouriers();


function mostrarCouriers() {
    let tbody = document.querySelector('#tblCouriers tbody');

    let sFiltro = document.querySelector('#txtFiltro').value;

    tbody.innerHTML = '';

    for(let i = 0; i < listaCouriers.length; i++) {
        if(listaCouriers[i]['activo'] == '1') {
        if (listaCouriers[i]['nombre'].toLowerCase().includes(sFiltro)) {
            let fila = tbody.insertRow();

            let cNumero = fila.insertCell();
            let cNombre = fila.insertCell();

            let cEditar = fila.insertCell();
            let cDesactivar = fila.insertCell();

            cEditar.classList.add('acciones');
            cDesactivar.classList.add('acciones');

            cNumero.appendChild(document.createTextNode(listaCouriers[i]['numero']));
            cNombre.appendChild(document.createTextNode(listaCouriers[i]['nombre']));
            //crea un elemento anchor y le asocia el href del html de modificar
            let atag = document.createElement('a');
            atag.setAttribute('href', "modificar_courier.html");
            //se crea un icono de editar
            let botonEditar = document.createElement('i');
            botonEditar.classList.add("far", "fa-edit");
            //se envuelve al icono de editar en el elemento anchor
            atag.appendChild(botonEditar);
            atag.dataset.courier = listaCouriers[i]['numero'];
            cEditar.appendChild(atag);


            //funcion que redirige a formulario para modificar
            atag.addEventListener('click', redirect);


            let botonDesactivar = document.createElement('i');
            botonDesactivar.classList.add("fas", "fa-times");
            botonDesactivar.dataset.indice = i;
            botonDesactivar.addEventListener('click', eliminar);
            cDesactivar.appendChild(botonDesactivar);

        }//if statement
       }//if activo
     }//for loop
}//funcion

function redirect() {
    var courier = this.dataset.courier;
    setTemp(courier);

}

function eliminar() {
        let idModificar = this.dataset.indice;
        let actualizar = [];
        swal({
            title: "¿Está seguro de eliminar el courier?",
            text: "Si lo hace, el registro del mismo desaparecerá por completo",
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
              if(botonUsuario === "Eliminar") {
            
                  if(listaCouriers[idModificar]['activo'] == '1') {
                    listaCouriers[idModificar]['activo'] = '0';
                 
                    actualizar.push(listaCouriers[idModificar]['numero'], listaCouriers[idModificar]['nombre'], listaCouriers[idModificar]['activo']);
                    actualizarCourier(actualizar);
                    mostrarCouriers();
                }
                  
              }
          })
    
    
    }
