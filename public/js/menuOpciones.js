(function() {
  var datosUsuario = obtenerDatoLocal('usuario');
  var paginaActual = document.title;
  var paginaRegistroClientes = paginaActual.includes('Registrar cliente');
  var cerrarSesionBoton = document.querySelector('#cerrarSesion');

  if (!paginaRegistroClientes && (!datosUsuario || datosUsuario.length === 0)) {
    window.location.href = '../iniciarSesion/index.html';
  }

  if (cerrarSesionBoton) {
    cerrarSesionBoton.addEventListener('click', cerrarSesion);
  }

  function cerrarSesion() {
    swal({
      title: "¿Está seguro de que desea cerrar sesión?",
      icon: "warning",
      buttons: {
        catch: {
          text: "Cerrar sesión",
          value: "Cerrar sesión",
          className: "button"
        },
        cancel: "Cancelar",
      },
    }).then((botonUsuario) => {
      if (botonUsuario === 'Cerrar sesión') {
        localStorage.removeItem('usuario');
        window.location.href = '../iniciarSesion/index.html';
      }
    });
  }

  var menuOpciones = document.querySelector('#menuOpciones');
  var rol = 'Rol';
  var editarPage = '#';
  var tipo_usuario = datosUsuario.length-2;

  switch (datosUsuario[tipo_usuario]) {
    case '1':
      rol = 'Administrador';
      menuOpciones.appendChild(crearLinkMenu('../clientes/registroClientes.html', 'Registro usuarios', ['fas', 'fa-file-alt']));
      menuOpciones.appendChild(crearLinkMenu('../Couriers/registrar_courier.html', 'Otros registros', ['fas', 'fa-file-alt']));
      menuOpciones.appendChild(crearLinkMenu('../clientes/listarClientes.html', 'Listar usuarios', ['far', 'fa-list-alt']));
      menuOpciones.appendChild(crearLinkMenu('../Couriers/listar_courier.html', 'Otros listados', ['far', 'fa-list-alt']));
      document.querySelector('.editarPerfil').style.display = 'none';
      crearSubMenuOpciones();
      break;
    case '2':
      rol = 'Cliente';
      editarPage = '../clientes/editarClientes.html';      
      menuOpciones.prepend(crearLinkMenu('../Tarjetas/tarjetas.html', 'Formas de pago', ['fas', 'fa-credit-card']));
      menuOpciones.prepend(crearLinkMenu('../paquetes/listarPaquetes.html', 'Listar paquetes', ['far', 'fa-list-alt']));
      menuOpciones.prepend(crearLinkMenu('../paquetes/alertarPaquete.html', 'Alertar paquetes', ['fas', 'fa-cube']));
      break;
    case '3':
      rol = 'Encargado de aduanas';
      editarPage = '../EncAduanas/modificar.html';
      menuOpciones.prepend(crearLinkMenu('../paquetes/listarPaquetes.html', 'Listar paquetes', ['far', 'fa-list-alt']));
      break;
    case '4':
      rol = 'Encargado de sucursal';
      editarPage = '../encargadoSucursal/index_modificar.html';
      menuOpciones.prepend(crearLinkMenu('../clientes/registroClientes.html', 'Registrar cliente', ['fas', 'fa-file-alt']));
      menuOpciones.prepend(crearLinkMenu('../repartidor/registrar_repartidor.html', 'Registrar repartidor', ['fas', 'fa-file-alt']));
      menuOpciones.prepend(crearLinkMenu('../clientes/listarClientes.html', 'Listar clientes', ['far', 'fa-list-alt']));
      menuOpciones.prepend(crearLinkMenu('../repartidor/listar_repartidor.html', 'Listar repartidores', ['far', 'fa-list-alt']));
      menuOpciones.prepend(crearLinkMenu('../asignarpaquetesrepartidor/asignarpaquetes_repartidor.html', 'Asignar paquetes', ['fas', 'fa-cube']));
      menuOpciones.prepend(crearLinkMenu('../paquetes/listarPaquetes.html', 'Listar paquetes', ['far', 'fa-list-alt']));
      break;
    case '5':
      rol = 'Repartidor';
      editarPage = '../repartidor/modificar_repartidor.html';
      menuOpciones.prepend(crearLinkMenu('../paquetes/listarPaquetes.html', 'Listar paquetes', ['far', 'fa-list-alt']));
      break;
  }

  if (datosUsuario[6] && datosUsuario[6].includes('cloudinary')) {
    document.querySelector('#userPerfilAvatar').setAttribute("src", datosUsuario[6]);
  }
  
  document.querySelector('#userNombre').innerText = rol + " " + datosUsuario[0] + " " + datosUsuario[2];
  document.querySelector('#editarPerfil').setAttribute("href", editarPage);

  if (paginaActual.includes('Editar perfil')){
    document.querySelector('#editarPerfilText').classList.add('activo');
  }

  if (paginaRegistroClientes && (!datosUsuario || datosUsuario.length === 0)){
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('#userNombre').style.display = 'none';
    document.querySelector('#userPerfilAvatar').style.display = 'none';
    document.querySelector('#editarPerfil').style.display = 'none';
    cerrarSesionBoton.style.display = 'none';
  }
  
  function crearLinkMenu(href, text, iconoClass) {
    var menuItem = document.createElement('li');
    var link = document.createElement('a');
    link.setAttribute('href', href);
    var contenedorIcono = document.createElement('span'); 
    contenedorIcono.classList.add('icon', 'iconMenu');
    var icono = document.createElement('i');
    iconoClass.forEach(className => {
      icono.classList.add(className);
    });
    contenedorIcono.appendChild(icono);
    var contenedorText = document.createElement('span');
    contenedorText.appendChild(document.createTextNode(text));
    contenedorText.classList.add('linkTexto');

    if (paginaActual.includes(text)){
      contenedorText.classList.add('activo');
    }

    link.appendChild(contenedorText);
    link.prepend(contenedorIcono);
    menuItem.appendChild(link);

    return menuItem;
  }

  function crearSubMenuOpciones() {
    var subMenuLinks = [];
    var subMenuTexto = [];
    var contenedorSubmenu = document.createElement('ul'); 
    contenedorSubmenu.classList.add('subMenu');

    if (paginaActual.includes('Registrar')){
      document.querySelector('#menuOpciones li:nth-child(2) .linkTexto').classList.add('activo');
      subMenuTexto = ['Cliente', 'Encargado de aduana', 'Encargado de sucursal', 'Repartidor'];
      subMenuLinks = ['../clientes/registroClientes.html', '../EncargadoAduana/RegistroEncAduanas.html', '../encargadoSucursal/index_registrar.html', '../repartidor/registrar_repartidor.html'];
    }

    if (paginaActual.includes('Otros registros')){
      document.querySelector('#menuOpciones li:nth-child(3) .linkTexto').classList.add('activo');
      subMenuTexto = ['Couriers', 'Sucursal', 'Convenio', 'Ruta', 'Tarifas', 'Tipos de artículos'];
      subMenuLinks = ['../Couriers/registrar_courier.html', '../sucursales/registrar_sucursal.html', '../convenios/registrarConvenios.html', '../rutas_reparto/registrar.html', '../Tarifas/index_registrar.html', '../tiposArticulos/registrar_tiposArticulo.html'];
    }

    if (paginaActual.includes('Listar usuarios')){
      document.querySelector('#menuOpciones li:nth-child(4) .linkTexto').classList.add('activo');
      subMenuTexto = ['Clientes', 'Encargados de aduana', 'Encargados de sucursal', 'Repartidores'];
      subMenuLinks = ['../clientes/listarClientes.html', '../EncargadoAduana/listarEncargadoAduana.html', '../encargadoSucursal/index_listar.html', '../repartidor/listar_repartidor.html'];
    }

    if (paginaActual.includes('Otros listados')){
      document.querySelector('#menuOpciones li:nth-child(5) .linkTexto').classList.add('activo');
      subMenuTexto = ['Couriers', 'Sucursales', 'Convenios', 'Rutas', 'Tarifas', 'Tipos de artículos'];
      subMenuLinks = ['../Couriers/listar_courier.html', '../sucursales/listar_Sucursal.html', '../convenios/ListarConvenios.html', '../rutas_reparto/listado.html', '../Tarifas/index_listar.html', '../tiposArticulos/listar_tiposArticulo.html'];
    }

    for (let i = 0; i < subMenuLinks.length; i++) {
      var menuItem = document.createElement('li');
      var link = document.createElement('a');
      link.appendChild(document.createTextNode(subMenuTexto[i]));
      link.setAttribute('href', subMenuLinks[i]);
      menuItem.appendChild(link);
      if (paginaActual.includes(subMenuTexto[i])){
        menuItem.classList.add('activo');
      }

      contenedorSubmenu.appendChild(menuItem);
    };

    document.querySelector('.content').prepend(contenedorSubmenu);
  };

})();