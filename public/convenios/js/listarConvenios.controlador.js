document.querySelector('#txtFiltro').addEventListener('keyup', mostrarConvenios2);
mostrarConvenios2();


function mostrarConvenios2(){
    let sFiltro = document.querySelector('#txtFiltro').value;
    let listaConvenios = obtenerConveniosbd();
    let cuerpoTabla = document.querySelector('#tblConvenios tbody');
    cuerpoTabla.innerHTML = '';

    for(let i = 0; i <listaConvenios.length; i++){
        if(listaConvenios[i]['activo'] == '1') {
            if (listaConvenios[i]['nombre'].toLowerCase().includes(sFiltro) ||listaConvenios[i]['descripcion'].toLowerCase().includes(sFiltro)){
            let fila = cuerpoTabla.insertRow();
            let cNombre = fila.insertCell();
            let cDescripcion = fila.insertCell();
            let cModificar = fila.insertCell();
            let cEliminar = fila.insertCell();

            cModificar.classList.add('acciones');
            cEliminar.classList.add('acciones');

            let sNombre = document.createTextNode(listaConvenios[i]['nombre']);
            let sDescripcion = document.createTextNode(listaConvenios[i]['descripcion']);

            cNombre.appendChild(sNombre);
            cDescripcion.appendChild(sDescripcion);

            //Creación del botón de editar-------------
            let botonEditar = document.createElement('i');
            botonEditar.classList.add("far", "fa-edit");
            let elementa = document.createElement('a');  
            elementa.setAttribute("href", "modificarConvenios.html"); 
            elementa.appendChild(botonEditar);
            elementa.addEventListener('click', redirect);
            elementa.dataset.id = listaConvenios[i]['_id']; 

            cModificar.appendChild(elementa);


            //Creación del botón de deshabilitar---------
            let botonDeshabilitar = document.createElement('i');
            botonDeshabilitar.classList.add("fas", "fa-times");
            botonDeshabilitar.dataset.indice = i;
            botonDeshabilitar.addEventListener('click', eliminar);       
            cEliminar.appendChild(botonDeshabilitar);
        }//if
       } //if estado
     }//for loop
}


function redirect(){
    let sId = this.dataset.id;
    setTemp(sId);
}

function eliminar() {
    var id = this.dataset.indice;
    var pajita = [];
    swal({
        title: "¿Está seguro de eliminar el convenio?",
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
              let listaConvenios = obtenerConveniosbd();
              if(listaConvenios[id]['activo'] == '1') {
                  listaConvenios[id]['activo'] = '0';

                  pajita.push(listaConvenios[id]['_id'], listaConvenios[id]['nombre'], listaConvenios[id]['descripcion'], listaConvenios[id]['activo']);

                  actualizarConvenio(pajita);
                mostrarConvenios2();
              }
          }
      })
}


