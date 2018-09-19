document.querySelector('#txtFiltro').addEventListener('keyup', mostrarTarifas);
let listaTarifas = obtenerListaTarifaDB();

function mostrarTarifas() {
    let tbody = document.querySelector('#tblTarifas tbody');
    let sFiltro = document.querySelector('#txtFiltro').value;
    tbody.innerHTML = '';

    for(let i = 0; i < listaTarifas.length; i++) {
        if(listaTarifas[i][4] == '1'){
        if(listaTarifas[i][2].includes(sFiltro)) {
            let fila = tbody.insertRow();

            let cSucursal = fila.insertCell();
            let cTarifaPeso = fila.insertCell();
            let cTarifaKm = fila.insertCell();

            let cEditar = fila.insertCell();
            let cDesactivar = fila.insertCell();

            cEditar.classList.add('acciones');
            cDesactivar.classList.add('acciones');

            cSucursal.appendChild(document.createTextNode(listaTarifas[i][2]));
            cTarifaPeso.appendChild(document.createTextNode(listaTarifas[i][1]));
            cTarifaKm.appendChild(document.createTextNode(listaTarifas[i][3]));

            let atag = document.createElement('a');
            atag.setAttribute('href', "index_modificar.html");

            let botonEditar = document.createElement('i');
            botonEditar.classList.add("far", "fa-edit");

            atag.appendChild(botonEditar);
            atag.dataset.id = listaTarifas[i][0];
            cEditar.appendChild(atag);

            atag.addEventListener('click', redirect);

            let botonDesactivar = document.createElement('i');
            botonDesactivar.classList.add("fas", "fa-times");
            botonDesactivar.dataset.indice = i;
            botonDesactivar.addEventListener('click', eliminar);
            cDesactivar.appendChild(botonDesactivar);
        }//if filtro
       }//if estado
    }//for
}

mostrarTarifas();

//funcion que redirige a modificar
function redirect() {
    let id = this.dataset.id;
    localStorage.setItem('tempTarifa', id);
}

function eliminar() {
        var id = this.dataset.indice;
        swal({
            title: "¿Está seguro de eliminar la tarifa?",
            text: "Si lo hace, la misma desaparecerá por completo",
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
                  let listaTarifas = obtenerDatoLocal('RegistroLS');
                  if(listaTarifas[id][5] == '1') {
                      listaTarifas[id][5] = '0'
                  }
                  else {listaTarifas[id][5] = '1'}
                  actualizarTarifa(listaTarifas[id]);
                  mostrarTarifas();
              }
          })
    
    
    }