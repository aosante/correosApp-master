(function() {
  var checkContrasena = document.querySelector('#checkPass');
  var contrasenaTemporal = document.querySelector('#passTemporal');
  var contrasenaNueva = document.querySelector('#passNueva');
  var contrasenaConfirmar = document.querySelector('#passConfirmar');

  checkContrasena.addEventListener('click', validarCambioPass);

  function validarCambioPass() {
    var datosValidos = false;
    var error = validarInputsRequeridos([contrasenaTemporal, contrasenaNueva, contrasenaConfirmar]);

    if(error == true) {
      mostrarMensajeModal('error formulario');
      return false;
    } else if (contrasenaTemporal.value != localStorage.getItem('loginTemp')) {
      contrasenaTemporal.classList.add('inputError');
      mostrarMensajeModal('error formulario');
      return false;
    }

    if (contrasenaNueva.value != contrasenaConfirmar.value) {
      contrasenaNueva.classList.add('inputError');
      contrasenaConfirmar.classList.add('inputError');
      mostrarMensajeModal('error formulario');
      return false;
    }
    
    var datosValidos = actualizarLogin(localStorage.getItem('loginID'), contrasenaNueva.value);

    if (!datosValidos) {
      contrasenaTemporal.classList.add('inputError');
      contrasenaNueva.classList.add('inputError');
      contrasenaConfirmar.classList.add('inputError');
      mostrarMensajeModal('error formulario');
    } else {
      localStorage.removeItem('loginID');
      localStorage.removeItem('loginTemp');
      var usuario = obtenerDatoLocal('usuario');
      var tipoUsuario = usuario.length-2;

      switch (usuario[tipoUsuario]) {
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
    };
  }

})();