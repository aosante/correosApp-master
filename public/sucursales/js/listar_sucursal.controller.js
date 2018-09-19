
document.querySelector('#txtFiltro').addEventListener('keyup', mostrarListas);
let listarSucursales = obtenerListaSucursal();

mostrarListas();



function mostrarListas() {
    //!!
    
    // console.log(listarSucursales);
    let tbody = document.querySelector('#tblListaSucursal tbody');
    let sfiltro = document.querySelector('#txtFiltro').value;   

    tbody.innerHTML = '';

    for (let i = 0; i < listarSucursales.length; i++) {
        let numero = listarSucursales[i]['numero'];
        if(listarSucursales[i]['activo'] == '1') {
        if (numero.toString().includes(sfiltro) || listarSucursales[i]['nombre'].toLowerCase().includes(sfiltro)) {
            let fila = tbody.insertRow(); // CREA FILAS


            let sSucursal = fila.insertCell(); // INSERTA EN LA FILA EN LA POS 0 EL NOMBRE
            let sDireccion = fila.insertCell();
            let sTelefono = fila.insertCell();
            let sModificar = fila.insertCell();
            let sDesactivar = fila.insertCell();

            sSucursal.appendChild(document.createTextNode(listarSucursales[i]['numero']));
            sDireccion.appendChild(document.createTextNode(listarSucursales[i]['nombre']));
            sTelefono.appendChild(document.createTextNode(listarSucursales[i]['tel']));


            //BOTONES MODIFICAR Y DESACTIVAR
            //Se definen las variables de los  botones modificar 
            let botonModificar = document.createElement('i'); //crea la variable del modificar con un icono
            botonModificar.classList.add("far", "fa-edit"); //inserta el elemento icono
            let botonDesactivar = document.createElement('i'); //crea la variable del modificar con un icono
            botonDesactivar.classList.add("fas", "fa-times"); //inserta el elemento icono
            botonDesactivar.dataset.indice = i;
            botonDesactivar.addEventListener('click', eliminar);
            

            let elementa = document.createElement('a');
            elementa.setAttribute("href", "modificar_sucursales.html");
            elementa.appendChild(botonModificar);
            elementa.addEventListener('click', redirect);
            elementa.dataset.sucursal = listarSucursales[i]['numero'];

            sModificar.appendChild(elementa);

            elementa.appendChild(botonModificar);
            sModificar.classList.add('acciones');

            sDesactivar.appendChild(botonDesactivar);
            sDesactivar.classList.add('acciones');
            sDesactivar.classList.add("iconos");


        }//if filtro
      }//if estado
    }//for loop
}


function redirect() {
    let sucursal = this.dataset.sucursal;
    setTemp(sucursal);
}

function eliminar() {
    let idModificar = this.dataset.indice;
    let actualizar = [];
    swal({
        title: "¿Está seguro de eliminar la sucursal?",
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
              //let listarSucursales = obtenerListaSucursal();
              if(listarSucursales[idModificar]['activo'] == '1') {
                  listarSucursales[idModificar]['activo'] = '0';
                //   console.log(listarSucursales[idModificar]);
                  actualizar.push(listarSucursales[idModificar]['numero'], listarSucursales[idModificar]['nombre'], listarSucursales[idModificar]['tel'], listarSucursales[idModificar]['activo']);
                  actualizarSucursal(actualizar);
                  mostrarListas();
              }
              
             
          }
      })


}









