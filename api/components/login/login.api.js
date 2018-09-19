const LoginModel = require('./login.model');

module.exports.registrar = function(req, res) {
  let newLogin = new LoginModel({
    pass: req.body.pass,
    email: req.body.email,
    temp: req.body.temp
  });

  newLogin.save(function(error) {
    if (error) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error en el registro de usuarios' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el login correctamente' });
    }
  })
};

module.exports.find = function(req, res) {
  LoginModel.findOne({ 'pass': req.body.pass, 'email': req.body.email }, function(err, login) {
    if (err || !login) {
      res.json(404, { success: false, msg: 'No se ha encontrado.'});
    } else {
      res.json({ success: true, msg: 'Usuario valido', login: login});
    }
  });
};

module.exports.actualizar = function(req, res) {
  LoginModel.findByIdAndUpdate(req.body._id, { $set: req.body }, function(err, user) {
    if (err || !user) {
      res.json(400, { success: false, msg: 'No se ha actualizado.'});
    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.'});
    }
  });
};