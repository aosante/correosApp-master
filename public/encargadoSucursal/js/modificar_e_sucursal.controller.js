let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', registrarDatosActualizados);

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

  
//mete las sucursales en el select de registro 
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

obtenerEncargado();


function obtenerEncargado() {
    var infoEncargado = [];
    var tempEncSusursal = localStorage.getItem('tempEncSusursal');
    if (tempEncSusursal) {
      infoEncargado = obtenerUsuarioDB(tempEncSusursal);
    } else {
      infoEncargado = obtenerDatoLocal('usuario');
    };

    document.querySelector('#txtPrimerNombre').value = infoEncargado[0];
    document.querySelector('#txtSegundoNombre').value = infoEncargado[1];
    document.querySelector('#txtPrimerApellido').value = infoEncargado[2];
    document.querySelector('#txtSegundoApellido').value = infoEncargado[3];
    document.querySelector('#txtId').value = infoEncargado[4];
    document.querySelector('#txtCorreo').value = infoEncargado[5];
    document.querySelector('#txtCorreo').disabled = true;

    document.querySelector('#dtFecha').value = infoEncargado[9]
    document.querySelector('#txtTel1').value = infoEncargado[7];
    document.querySelector('#txtTel2').value = infoEncargado[8];   
    document.querySelector('#opGenero').value = infoEncargado[10];
    document.querySelector('#opSucursal').value = infoEncargado[11];

    if (infoEncargado[6] && infoEncargado[6].includes('cloudinary')) {
        document.querySelector('#previewFoto').setAttribute("src", infoEncargado[6]);
        document.querySelector('#previewFoto').style.display = 'block';
    }
}

function registrarDatosActualizados() {
    let inputs = document.querySelectorAll('input:required');
    let error = validarInputsRequeridos(inputs);

    if(error == true) {
        mostrarMensajeModal('error formulario');
    }
    else {
        let infoEncargadoSucursal = [];

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
        
        infoEncargadoSucursal.push(primerNombre, segundoNombre, primerApellido, segundoApellido, cedula, correo, fotoPerfil, telefono_1, telefono_2
        , fechaNacimiento, genero, '', sucursal, sTipoUsuario, sActivo);

        var image = document.querySelector('#previewFoto').getAttribute("src");

        if (image) {
            infoEncargadoSucursal[6] = image;
        };

        if (!localStorage.getItem('tempEncSusursal')) { 
            localStorage.setItem('usuario', JSON.stringify(infoEncargadoSucursal));
        };

        actualizarUsuarioDB(infoEncargadoSucursal, 'update_user');
        localStorage.removeItem('tempEncSusursal');
        mostrarMensajeModal('registro exitoso');
    };
}

