document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

    var imagePreview = document.querySelector('#previewFoto');
    var urlFotoPerfil = false;
  
    function initFotoPerfil() {
      $("input.cloudinary-fileupload[type=file]").unsigned_cloudinary_upload(unsignedUser, { cloud_name: imageCloudName, tags: 'browser_uploads' })
        .bind('cloudinarydone', function(e, data) {
          imagePreview.setAttribute("src", data.result.url);
          imagePreview.style.display = 'block';
          urlFotoPerfil = data.result.url;
          document.querySelector('#inputFotoPerfil').classList.remove('inputError');
        });
    };
    initFotoPerfil();

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

function obtenerDatos() {
    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);

    if(error == true) {
        mostrarMensajeModal('error formulario');
    }
    else {
        let infoEncargadoSucursal = [];
        let contraseña = generarDato(0, 'contraseña');

        let primerNombre = document.querySelector('#txtPrimerNombre').value;
        let segundoNombre = document.querySelector('#txtSegundoNombre').value;
        let primerApellido = document.querySelector('#txtPrimerApellido').value;
        let segundoApellido = document.querySelector('#txtSegundoApellido').value;
        let cedula = document.querySelector('#txtId').value;
        let correo = document.querySelector('#txtCorreo').value;
        let telefono_1 = document.querySelector('#txtTel1').value;
        let telefono_2 = document.querySelector('#txtTel2').value;
        let edad = calcularEdad(document.querySelector('#dtFecha').value);
        let fechaNacimiento = document.querySelector('#dtFecha').value;
        let genero = document.querySelector('#opGenero').value;
        let sucursal = document.querySelector('#opSucursal').value;
        let fotoPerfil = urlFotoPerfil;
        let sTipoUsuario = '4';
        let sActivo = '1';

        if (edad < 18) {
            mostrarMensajeModal('error edad');
            return false;
        }

        let registroValido = validarRegistroDoble(correo);
        if(registroValido == false) {
            return false;
        }
        
        infoEncargadoSucursal.push(primerNombre, segundoNombre, primerApellido, segundoApellido, cedula, correo, fotoPerfil, telefono_1, telefono_2
        , fechaNacimiento, genero, '', sucursal, sTipoUsuario, sActivo);
        guardarUsuarioDB(infoEncargadoSucursal, 'save_user');
        guardarLoginDB(correo, contraseña, true);

        var nombreEmail = primerNombre+' '+primerApellido;
        enviarCorreo('temporal', contraseña, nombreEmail);

        mostrarMensajeModal('registro exitoso de usuario');
        limpiar();
    }//else
}

function limpiar() {
    document.querySelector('#txtPrimerNombre').value = '';
    document.querySelector('#txtSegundoNombre').value = '';
    document.querySelector('#txtPrimerApellido').value = '';
    document.querySelector('#txtSegundoApellido').value = '';
    document.querySelector('#txtId').value = '';
    document.querySelector('#txtCorreo').value = '';
    document.querySelector('#txtTel1').value = '';
    document.querySelector('#txtTel2').value = '';
    document.querySelector('#dtFecha').value = '';
}

