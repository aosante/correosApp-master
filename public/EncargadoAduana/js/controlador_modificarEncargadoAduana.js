let botonActualizar = document.querySelector('#btnGuardar');
botonActualizar.addEventListener('click',obtenerEncAdua_Actualizar);

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

function obtenerEncargadoAduana() {
    var infoAduana = [];
    var tempCliente = localStorage.getItem('tempEncAduanas');
    if (tempCliente) {
        infoAduana = obtenerUsuarioDB(tempCliente);
    } else {
        infoAduana = obtenerDatoLocal('usuario');
    };
 
    console.log(infoAduana);
    
    document.querySelector('#txtPrimernombre').value=infoAduana[0];
    document.querySelector('#txtSegundonombre').value = infoAduana[1];
    document.querySelector('#txtPrimerapellido').value=infoAduana[2];
    document.querySelector('#txtSegundoapellido').value = infoAduana[3];
    document.querySelector('#txtIdentificacion').value = infoAduana[4]
    document.querySelector('#txtCorreo').value = infoAduana[5];
    document.querySelector('#txtTelefono1').value = infoAduana[7];
    document.querySelector('#txtTelefono2').value = infoAduana[8];
    document.querySelector('#txtFechanacimiento').value = infoAduana[9];
    document.querySelector('#sltGenero').value = infoAduana[10];
    document.querySelector('#txtPuestoReal').value = infoAduana[16];

    if (infoAduana[6] && infoAduana[6].includes('cloudinary')) {
        document.querySelector('#previewFoto').setAttribute("src", infoAduana[6]);
        document.querySelector('#previewFoto').style.display = 'block';
    }
}

obtenerEncargadoAduana();

function obtenerEncAdua_Actualizar() {
    let inputs = document.querySelectorAll('#registroEncAduanasForm input:required, #registroEncAduanasForm textarea:required, #registroEncAduanasForm select[name="genero"]');
    let error = validarInputsRequeridos(inputs);

    if(error == true ) {
      mostrarMensajeModal('error formulario');
    } else { 
        let aEncAduanas = [];
        let tipoUsuario = '3';
        let activo = '1';
        let fotoPerfil = urlFotoPerfil;

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
        let inputCorreo = document.querySelector('#txtCorreo');
        let sCorreo = inputCorreo.value;
        let inputFechanacimiento = document.querySelector('#txtFechanacimiento');
        let sFechanacimiento = inputFechanacimiento.value;
        let selectGenero = document.querySelector('#sltGenero');
        let sGenero = selectGenero.value;
        let inputPuestoReal = document.querySelector('#txtPuestoReal');
        let sPuestoReal = inputPuestoReal.value;
        
        let sEdad = calcularEdad(sFechanacimiento);

        if(sEdad < 18) {
            mostrarMensajeModal('error edad');
            return false;
        }
        
        aEncAduanas.push(sPrimernombre, sSegundonombre, sPrimerapellido, sSegundoapellido, sIdentificacion, sCorreo, fotoPerfil, sTelefono1, sTelefono2, sFechanacimiento, sGenero, '', sPuestoReal, tipoUsuario, activo);
    
        var image = document.querySelector('#previewFoto').getAttribute("src");
        if (image) {
            aEncAduanas[6] = image;
        };

        actualizarUsuarioDB(aEncAduanas, 'update_user');
        mostrarMensajeModal('registro exitoso');
        localStorage.removeItem('tempEncAduanas');
        //window.location.href = 'listarEncargadoAduana.html';
    }
}

