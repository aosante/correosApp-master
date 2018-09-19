////INTERFAZ LISTAR ARTICULOS

document.querySelector('#txtFiltro').addEventListener('keyup', mostrarListas);
let listarArticulos = obtenerListaTipoArticuloDB();
mostrarListas();


function mostrarListas() {
    let tbody = document.querySelector('#tblListaArticulo tbody');
    let sfiltro = document.querySelector('#txtFiltro').value;
    tbody.innerHTML = '';

    for (let i = 0; i < listarArticulos.length; i++) {
        if(listarArticulos[i][3] == '1') {
            if (listarArticulos[i][1].toLowerCase().includes(sfiltro)) {
                let fila = tbody.insertRow(); // CREA FILAS
                let sNombre = fila.insertCell(); // INSERTA EN LA FILA EN LA POS 0 
                let sPorcentage = fila.insertCell();
                let sModificar = fila.insertCell();
                let sDesactivar = fila.insertCell();

                sNombre.appendChild(document.createTextNode(listarArticulos[i][1]));
                sPorcentage.appendChild(document.createTextNode(listarArticulos[i][2]));
            
                let botonModificar = document.createElement('i'); 
                botonModificar.classList.add("far", "fa-edit"); 

                let botonDesactivar = document.createElement('i'); 
                botonDesactivar.classList.add("fas", "fa-times");
                botonDesactivar.dataset.indice = i;
                botonDesactivar.addEventListener('click', eliminar); 
                
                let elementA = document.createElement('a');
                elementA.setAttribute("href", "modificar_tiposArticulo.html");
                elementA.appendChild(botonModificar);
                elementA.addEventListener('click', redirect);
                elementA.dataset.id = listarArticulos[i][0];

                sModificar.appendChild(elementA);

                elementA.appendChild(botonModificar);
                sModificar.classList.add('acciones');

                sDesactivar.appendChild(botonDesactivar);
                sDesactivar.classList.add('acciones');

                sDesactivar.classList.add("iconos");
            }
        }//if
    }//for
}


function redirect() {
    let id = this.dataset.id;
    localStorage.setItem('tempArticulo', id);
}

function eliminar() {
    let id = this.dataset.indice;
    swal({
        title: "¿Está seguro de eliminar la categoría?",
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
          if(botonUsuario === "Eliminar") {
              let listarArticulos = obtenerDatoLocal('RegistroArticulosLS');
              if(listarArticulos[id][3] == '1') {
                  listarArticulos[id][3] = '0'
              }
              else {listarArticulos[id][3] = '1'}
              actualizarListaArticulos(listarArticulos[id]);
              mostrarListas();
          }
      })


}









