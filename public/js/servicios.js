const imageCloudName = 'xxxxxxx';
const unsignedUser = 'xxxxx';

if (typeof($) !== 'undefined' && $.cloudinary && $.cloudinary.unsigned_upload_tag) {
  $.cloudinary.unsigned_upload_tag(unsignedUser, { cloud_name: imageCloudName });
}

function calcularEdad(fecha) {
  let hoy = new Date();
  let nacimiento = new Date(fecha);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  return edad;
}

function generarDato(numero, contraseña) {
  if (contraseña) {
    return Math.random().toString(36).substring(4);
  }
  return Math.floor(Math.random() * Math.floor(999));
}

function validarInputsRequeridos(inputs) {
  let error = false;
  
  for(let i = 0; i < inputs.length; i++) {
    if((inputs[i].value == '' && inputs[i].type != 'file') || esInvalidoInput(inputs[i])) {
      error = true;
      inputs[i].classList.add('inputError');
    }
    else {
      inputs[i].classList.remove('inputError');
    }
  }

  return error;
}

function validarRegistroDoble(correo) {
  let usuario = obtenerUsuarioDB(correo);
  if (usuario) {
    swal({  
      title: "Usuario ya registrado",  
      text: "Esta dirección de correo ya ha sido utilizada",  
      icon: "error",  
      button: {  
        text: "OK",  
        className: "button",  
      }
    })
    return false; 
  };
};

function mostrarMensajeModal(tipoMensaje) {
  switch (tipoMensaje) {
    case 'error formulario':
      swal({
        title: "Ocurrió un error",
        text: "Por favor verifique los campos resaltados",
        icon: "error",
        button: {
          text: "OK",
          className: "button",
        },
      });
      break;
    case 'registro exitoso':
      swal({
        title: "Información registrada correctamente",
        text: "Puede proceder",
        icon: "success",
        button: {
          text: "OK",
          className: "button",
        },
        });
      break;
    case 'error edad':
      swal({
        title: "Necesita ser mayor de edad para ingresar",
        text: "Verifique la fecha de nacimiento",
        icon: "error",
        button: {
          text: "OK",
          className: "button",
        },
        });
      break;
    case 'registro exitoso de usuario':
      swal({
        title: "Información registrada correctamente",
        text: "Se ha enviado una contraseña temporal al correo electrónico registrado.",
        icon: "success",
        button: {
          text: "OK",
          className: "button",
        },
      }).then(() => {
        window.location.href = '../iniciarSesion/index.html';
      });
      break;
  }
}


function esInvalidoInput (input) {
  var tipoInput = input.dataset.tipoInput;
  var valorInput = input.value;

  if (!tipoInput) {
    return false;
  }

  var esInvalido = false;
  var match = null;
  var maxlength = 1;
  var matchAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/gi;
  var matchNumber = /^[0-9]*(?:\.\d{1,2})?$/;
  var matchPhone = /^[0-9]{4}[-\s][0-9]{4}$/;
  var matchEmail = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/;
  var matchComment = /^[a-zA-Z0-9!?@#$%\^&*\s)(+=._-]*$/gi;
  var matchPassword = /^(?=\S.*\d)(?=.*[a-z])(?=.*[A-Z]).[\S]{7,14}$/;

  if (tipoInput === 'email') {
    var tipoEmail = input.dataset.tipoEmail;
   
    if (tipoEmail && !valorInput.includes(tipoEmail)) {
      return true;
    };
    
    match = matchEmail;
  }

  if (tipoInput === 'pass') {
    match = matchPassword;
  }

  if (tipoInput === 'tel') {
    match = matchPhone;
  }

  if (tipoInput === 'numero') {
    maxlength = input.dataset.cantidad;

    if (maxlength) {
      if ((valorInput.length + '') != maxlength) {
        return true;
      };
    }

    match = matchNumber;
  }

  if (tipoInput === 'texto') {
    match = matchAlpha;
  }

  if (tipoInput === 'textoNum') {
    match = matchComment;
  }

  var matches = valorInput.match(match);

  if (matches == null) {
    esInvalido = true;
  }

  return esInvalido;
}

function guardarUsuarioDB(datos, ruta){
  let mensaje = false;

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/'+ruta,
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async: false,
    data: {data: JSON.stringify(datos)} 
  });
 
  peticion.done(function(response){
    mensaje = 'Se registró con éxito';
  });

  peticion.fail(function(){
    mensaje = false;
  });

  return mensaje;
}

function guardarLoginDB(correo, contraseña, temp){
  let mensaje = false;

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/save_login',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async: false,
    data: {
      pass: contraseña,
      email: correo,
      temp: temp
    }
  });
 
  peticion.done(function(response){
    mensaje = 'Se registró con éxito';
  });

  peticion.fail(function(){
    mensaje = false;
  });

  return mensaje;
}
 
function obtenerListaDB(ruta){
  let lista = [];
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/'+ ruta,
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async:false,
    data:{}
  });

  peticion.done(function(usuarios){
    for(let i = 0; i < usuarios.length; i++){
      var dato = [];
      for (var key in usuarios[i]) {
        if (key != '__v' && key != '_id') {
          dato.push(usuarios[i][key]);
        };
      }
      lista.push(dato);
    }
    console.log('Petición realizada con éxito');
  });

  peticion.fail(function(){
    lista = [];
    console.log('Ocurrió un error');
  });

  return lista;
};

function obtenerUsuarioDB(correo){
  let usuario = [];
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/user_by_email',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async:false,
    data: {
      correo_electronico : correo
    }
  });

  peticion.done(function(usuarioInfo){
    for (var key in usuarioInfo.data) {
      if (key != '__v' && key != '_id') {
        usuario.push(usuarioInfo.data[key]);
      };
    };
    console.log('Petición realizada con éxito');
  });

  peticion.fail(function(){
    usuario = false;
    console.log('Ocurrió un error');
  });

  return usuario;
};

function loginUsuario(correo, pass){
  let esValido = [];

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/login',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async:false,
    data: {
      email : correo,
      pass: pass
    }
  });

  peticion.done(function(usuario) {
    esValido = usuario;
  });

  peticion.fail(function() {
    esValido = false;
  });

  return esValido;
};

function actualizarLogin(id, pass){
  let esValido = false;

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/update_login',
    type: 'put',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async:false,
    data: {
      _id: id,
      pass: pass,
      temp: false
    }
  });

  peticion.done(function() {
    esValido = true;
  });

  peticion.fail(function() {
    esValido = false;
  });

  return esValido;
};

function actualizarUsuarioDB(datos, ruta){
  let esValido = false;

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/'+ruta,
    type: 'put',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async:false,
    data: {data: JSON.stringify(datos)} 
  });

  peticion.done(function() {
    esValido = true;
  });

  peticion.fail(function() {
    esValido = false;
  });

  return esValido;
};

function enviarCorreo(type, contraseña, nombre, factura){
  let data = {};
  let mensaje = '';
  
  if (type === 'temporal') {
    data.nombre = nombre;
    data.temporal = contraseña;
  };

  if (type === 'factura') {
    data = factura;
  };

  let peticion = $.ajax({
    url: 'http://localhost:4000/api/send_email',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType : 'json',
    async: false,
    data: data
  });
 
  peticion.done(function(response){
    mensaje = 'Se registró con éxito';
  });

  peticion.fail(function(){
    mensaje = false;
  });

  return mensaje;
};

function actualizarUsuario(correo){
    let peticion = $.ajax({
      url: 'http://localhost:4000/api/delete_user',
      type: 'put',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType: 'json',
      async:false,
      data:{
          'activo' : '0',
          'correo_electronico' : correo
      }
  });

  peticion.done(function(response){
      console.log('El convenio se registró con éxito');
  });

  peticion.fail(function(){
      console.log('El convenio no se pudo registrar');
  })
};

function obtenerListaSucursales() {
  let listaSucursales = [];
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_todas_sucursales',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType: 'json',
      async:false,
      data:{}
  });

  peticion.done(function(response) {
    for(let i = 0; i < response.length; i++){
      var sucursal = [];
      for (var key in response[i]) {
        if (key != '__v' && key != '_id') {
          sucursal.push(response[i][key]);
        };
      }
      listaSucursales.push(sucursal);
    }
  });

  return listaSucursales;
}