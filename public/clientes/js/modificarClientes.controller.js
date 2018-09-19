(function () {
  document.querySelector('#desactivarCuenta').addEventListener('click', desactivarCuenta);

  function agregarSucursales() {
    let lista = obtenerListaSucursales();
    for(let i = 0; i < lista.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = lista[i][1];
        opcion.innerText = lista[i][1];
        document.getElementById('opSucursal').appendChild(opcion);
    }
}

agregarSucursales();

  function mostarDatosUsuarios() {
    var datosUsuario = [];
    var tempCliente = localStorage.getItem('tempCliente');
    if (tempCliente) {
      datosUsuario = obtenerUsuarioDB(tempCliente);
      document.querySelector('#desactivarCuenta').style.display = 'none';
    } else {
      datosUsuario = obtenerDatoLocal('usuario');
    };

    document.querySelector('.formRegistroClientes input[name="nombre"').value = datosUsuario[0]
    document.querySelector('.formRegistroClientes input[name="segundoNombre"').value = datosUsuario[1]
    document.querySelector('.formRegistroClientes input[name="primerApellido"').value = datosUsuario[2]
    document.querySelector('.formRegistroClientes input[name="segundoApellido"').value = datosUsuario[3]
    document.querySelector('.formRegistroClientes input[name="cedula"').value = datosUsuario[4]
    document.querySelector('.formRegistroClientes input[name="email"').value = datosUsuario[5]
    document.querySelector('.formRegistroClientes input[name="telefono1"').value = datosUsuario[7]
    document.querySelector('.formRegistroClientes input[name="telefono2"').value = datosUsuario[8]
    document.querySelector('.formRegistroClientes input[name="fechaNacimiento"').value = datosUsuario[9]
    document.querySelector('.formRegistroClientes select[name="genero"').value = datosUsuario[10]
    document.querySelector('.formRegistroClientes textarea[name="direccion"').value = datosUsuario[11]
    document.querySelector('.formRegistroClientes input[name="provincia"').value = datosUsuario[12]
    document.querySelector('.formRegistroClientes input[name="canton"').value = datosUsuario[13]
    document.querySelector('.formRegistroClientes input[name="distrito"').value = datosUsuario[14]
    document.querySelector('.formRegistroClientes input[name="sucursal"').value = datosUsuario[15]

    if (datosUsuario[6] && datosUsuario[6].includes('cloudinary')) {
      document.querySelector('#previewFoto').setAttribute("src", datosUsuario[6]);
      document.querySelector('#previewFoto').style.display = 'block';
    }
  };

  mostarDatosUsuarios();

  function desactivarCuenta() {
    swal({
      title: "¿Está seguro de que desea desactivar la cuenta?",
      text: "Si desactiva la cuenta no puede volver a ingresar al sistema.",
      icon: "warning",
      buttons: {
        catch: {
          text: "Desactivar",
          value: "Desactivar",
          className: "button"
        },
        cancel: "Cancelar",
      },
    }).then((botonUsuario) => {
      if (botonUsuario === 'Desactivar') {
        console.log("Desactivar");
        var listaUsuarios = obtenerDatoLocal('listaUsuarios');
        var datosUsuario = obtenerDatoLocal('usuario');

        for(var i = 0; i < listaUsuarios.length; i++) {
          if (listaUsuarios[i][5] === datosUsuario[5]) {
            var activo = listaUsuarios[i].length-1;
            listaUsuarios[i][activo] = '0';
          }
        };

        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
        localStorage.removeItem('usuario');
        window.location.href = '../iniciarSesion/index.html';
      }
    });
  }

})();