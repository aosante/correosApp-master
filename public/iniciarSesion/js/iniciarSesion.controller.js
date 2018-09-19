(function() {
  var checkUsuario = document.querySelector('#checkUsuario');
  var sesionEmail = document.querySelector('#sesionEmail');
  var sesionPassword = document.querySelector('#sesionPassword');
  checkUsuario.addEventListener('click', validarDatosIngreso);

  sesionEmail.addEventListener('keyup', quitarMensajeError);
  sesionPassword.addEventListener('keyup', quitarMensajeError);

  function validarDatosIngreso() {
    var datosValidos = false;
    var error = validarInputsRequeridos([sesionEmail, sesionPassword]);

    if(error == true) {
      mostarMensajeError();
      mostrarMensajeModal('error formulario');
      return false;
    }
    var datosValidos = loginUsuario(sesionEmail.value, sesionPassword.value);
  
    if (!datosValidos) {
      mostarMensajeError();
      mostrarMensajeModal('error formulario');
    } else {
      obtenerUsuario(sesionEmail.value, datosValidos.login);
    }
  }

  function mostarMensajeError() {
    sesionPassword.classList.add('inputError');
    sesionEmail.classList.add('inputError');
  }

  function quitarMensajeError() {
    this.classList.remove('inputError');
  }

  function obtenerUsuario(email, esTemporal) {
    var usuario = obtenerUsuarioDB(email);

    if (usuario && usuario.length != 0) {
      var tipoUsuario = usuario.length-2;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      redireccionarUsuario(usuario[tipoUsuario], esTemporal);
    } else {
      mostrarMensajeModal('error formulario');
    };
  }

  function redireccionarUsuario(tipoUsuario, temporal) {
    if (temporal.temp) {
      localStorage.setItem('loginTemp', temporal.pass);
      localStorage.setItem('loginID', temporal._id);
      window.location.href = './modificarContrasena.html';
      return true;
    };
    
    switch (tipoUsuario) {
      case '1':
        window.location.href = '../clientes/registroClientes.html';
        break;
      case '2':
        window.location.href = '../paquetes/alertarPaquete.html';
        break;
      default:
        window.location.href = '../paquetes/listarPaquetes.html';
        break;
    };
  }
})()