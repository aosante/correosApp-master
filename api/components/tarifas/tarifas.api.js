const TarifasModel = require('./tarifas.model');

module.exports.registrar = function(req, res) {
  let newTarifa = new TarifasModel({
    peso: req.body.peso,
    sucursal: req.body.sucursal,
    kilometro: req.body.kilometro,
    activo: req.body.activo,
  });

  newTarifa.save(function(error) {
    if (error) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error en el registro de usuarios' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el login correctamente' });
    }
  })
};

module.exports.listarTodos = function(req, res) {
  TarifasModel.find().then(function(tarifas) {
    res.send(tarifas);
  });
};

module.exports.find = function(req, res) {
  TarifasModel.findOne({ '_id': req.body.id}, function(err, dato) {
    if (err || !dato) {
      res.json(404, { success: false, msg: 'No se ha encontrado.'});
    } else {
      res.json({ success: true, msg: 'Usuario valido', dato: dato});
    }
  });
};

module.exports.actualizar = function(req, res) {
  TarifasModel.findByIdAndUpdate(req.body._id, { $set: req.body }, function(err, dato) {
    if (err || !dato) {
      res.json(400, { success: false, msg: 'No se ha actualizado.'});
    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.'});
    }
  });
};