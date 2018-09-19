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


obtenerRepartidor();

function obtenerRepartidor() {
    var infoRepartidor = [];
    var tempRepartidor = localStorage.getItem('tempRepartidor');
    if (tempRepartidor) {
      infoRepartidor = obtenerUsuarioDB(tempRepartidor);
    } else {
      infoRepartidor = obtenerDatoLocal('usuario');
    };

    document.querySelector('#txtPrimernombre').value = infoRepartidor[0];
    document.querySelector('#txtSegundonombre').value = infoRepartidor[1];
    document.querySelector('#txtPrimerapellido').value = infoRepartidor[2];
    document.querySelector('#txtSegundoapellido').value = infoRepartidor[3];
    document.querySelector('#txtIdentificacion').value = infoRepartidor[4];
    document.querySelector('#txtCorreo').value = infoRepartidor[5];
    document.querySelector('#txtTelefono1').value = infoRepartidor[7];
    document.querySelector('#txtTelefono2').value = infoRepartidor[8];
    document.querySelector('#txtFechanacimiento').value = infoRepartidor[9];
    document.querySelector('#sltGenero').value = infoRepartidor[10];
    document.querySelector('#sltSucursal').value = infoRepartidor[11];
    
    if (infoRepartidor[6] && infoRepartidor[6].includes('cloudinary')) {
        document.querySelector('#previewFoto').setAttribute("src", infoRepartidor[6]);
        document.querySelector('#previewFoto').style.display = 'block';
    }

}

let botonActualizar = document.querySelector('#btnGuardar');
botonActualizar.addEventListener('click', obtenerActualizar);

function obtenerActualizar() {
    let inputs = document.querySelectorAll('input:required');
    let berror = validarInputsRequeridos(inputs);

    if (berror == true) {
        mostrarMensajeModal('error formulario');
    } else {
        let aRepartidores = [];
        
        let inputPrimernombre = document.querySelector('#txtPrimernombre');
        let sPrimernombre = inputPrimernombre.value;

        let inputSegundonombre = document.querySelector('#txtSegundonombre');
        let sSegundonombre = inputSegundonombre.value;

        let inputPrimerapellido = document.querySelector('#txtPrimerapellido');
        let sPrimerapellido = inputPrimerapellido.value;

        let inputSegundoapellido = document.querySelector('#txtSegundoapellido');
        let sSegundoapellido = inputSegundoapellido.value;

        let inputIdentificacion = document.querySelector('#txtIdentificacion');
        let sIdentificacion = inputIdentificacion.value;

        let inputTelefono1 = document.querySelector('#txtTelefono1');
        let sTelefono1 = inputTelefono1.value;

        let inputTelefono2 = document.querySelector('#txtTelefono2');
        let sTelefono2 = inputTelefono2.value;

        let sEdad = calcularEdad(document.querySelector('#txtFechanacimiento').value);

        let inputCorreo = document.querySelector('#txtCorreo');
        let sCorreo = inputCorreo.value;

        let fotoPerfil = urlFotoPerfil;

        let inputFechanacimiento = document.querySelector('#txtFechanacimiento');
        let sFechanacimiento = inputFechanacimiento.value;

        let selectGenero = document.querySelector('#sltGenero');
        let sGenero = selectGenero.value;

        let selectSucursal = document.querySelector('#sltSucursal');
        let sSucursal = selectSucursal.value;

        let sTipoUsuario = '5';

        let sActivo = '1';

        if(sEdad < 18) {
            mostrarMensajeModal('error edad');
            return false;
        }
        
        aRepartidores.push(sPrimernombre, sSegundonombre, sPrimerapellido, sSegundoapellido, sIdentificacion, sCorreo, fotoPerfil,
            sTelefono1, sTelefono2, sFechanacimiento, sGenero, '', sSucursal, sTipoUsuario, sActivo);

        var image = document.querySelector('#previewFoto').getAttribute("src");

        if (image) {
            aRepartidores[6] = image;
        };

        if (!localStorage.getItem('tempRepartidor')) { 
            localStorage.setItem('usuario', JSON.stringify(aRepartidores));
        };

        actualizarUsuarioDB(aRepartidores, 'update_user');
        localStorage.removeItem('tempRepartidor');
        mostrarMensajeModal('registro exitoso');
    }
}