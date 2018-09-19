const UserModel = require('./usuarios.model');

module.exports.registrar = function(req, res) {
  req.body.data = JSON.parse(req.body.data);

  let provincia = '';
  let canton = '';
  let distrito = '';
  let sucursal = '';
  let puesto_real = '';
  let tipo_usuario = req.body.data.length-2;
  let activo = req.body.data.length-1;

  if (req.body.data[tipo_usuario] === '2') {
    provincia = req.body.data[12];
    canton = req.body.data[13];
    distrito = req.body.data[14];
    sucursal = req.body.data[15];
  };

  if (req.body.data[tipo_usuario] === '3') {
    puesto_real = req.body.data[13];
  }

  if (req.body.data[tipo_usuario] === '4' || req.body.data[tipo_usuario] === '5') {
    sucursal = req.body.data[12];
  }

  let newUser = new UserModel({
    primer_nombre: req.body.data[0],
    segundo_nombre: req.body.data[1],
    primer_apellido: req.body.data[2],
    segundo_apellido: req.body.data[3],
    identificacion: req.body.data[4],
    correo_electronico: req.body.data[5],
    foto_perfil: req.body.data[6],
    telefono_1: req.body.data[7],
    telefono_2: req.body.data[8],
    fecha_nacimiento: req.body.data[9],
    genero: req.body.data[10],
    provincia: provincia,
    canton: canton,
    distrito: distrito,
    direccion: req.body.data[11],
    sucursal: sucursal,
    puesto_real: puesto_real,
    tipo_usuario: req.body.data[tipo_usuario],
    activo: req.body.data[activo]
  });

  newUser.save(function(error) {
    if (error) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error en el registro de usuarios' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el usuario correctamente' });
    }
  })
};

module.exports.listarTodos = function(req, res) {
  UserModel.find({tipo_usuario: req.query.type}).then(function(usuarios) {
    res.send(usuarios);
  });
};

module.exports.findByEmail = function(req, res) {
  UserModel.findOne({ 'correo_electronico': req.body.correo_electronico }, function(err, user) {
    if (err || user === null) {
      res.json(404, { success: false, msg: 'No se ha encontrado.'});
    } else {
      res.json({ success: true, msg: 'Usuario valido', data: user });
    }
  });
};

module.exports.actualizar = function(req, res) {
  req.body.data = JSON.parse(req.body.data);

  let provincia = '';
  let canton = '';
  let distrito = '';
  let sucursal = '';
  let puesto_real = '';
  let tipo_usuario = req.body.data.length-2;
  let activo = req.body.data.length-1;

  if (req.body.data[tipo_usuario] === '2') {
    provincia = req.body.data[12];
    canton = req.body.data[13];
    distrito = req.body.data[14];
    sucursal = req.body.data[15];
  };

  if (req.body.data[tipo_usuario] === '3') {
    puesto_real = req.body.data[12];
  }

  if (req.body.data[tipo_usuario] === '4' || req.body.data[tipo_usuario] === '5') {
    sucursal = req.body.data[12];
  }

  var newData = {
    primer_nombre: req.body.data[0],
    segundo_nombre: req.body.data[1],
    primer_apellido: req.body.data[2],
    segundo_apellido: req.body.data[3],
    identificacion: req.body.data[4],
    correo_electronico: req.body.data[5],
    foto_perfil: req.body.data[6],
    telefono_1: req.body.data[7],
    telefono_2: req.body.data[8],
    fecha_nacimiento: req.body.data[9],
    genero: req.body.data[10],
    provincia: provincia,
    canton: canton,
    distrito: distrito,
    direccion: req.body.data[11],
    sucursal: sucursal,
    puesto_real: puesto_real,
    tipo_usuario: req.body.data[tipo_usuario],
    activo: req.body.data[activo]
  };

  UserModel.findOneAndUpdate({"correo_electronico": newData.correo_electronico}, { $set: newData }, function(err, user) {
    if (err) {
      res.json(400, { success: false, msg: 'No se ha actualizado.'});
    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};

module.exports.eliminar=function(req, res){
  UserModel.findOneAndUpdate({'correo_electronico' : req.body.correo_electronico}, {$set: req.body}).then(
  function(usuario, err){
    console.log(err, usuario);
    if(err || usuario == null){
      res.json({success: false, msg: 'No se ha actualizado el usuario debido al siguiente error: ' + error})
    }else{
      res.json({success: true, msg: 'El usuario se ha actualizado éxitosamente '});
    }
  });
};