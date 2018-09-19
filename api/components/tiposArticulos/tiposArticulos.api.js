const TipoArticuloModel = require('./tiposArticulos.model');

module.exports.registrar = function(req, res) {
  let newTipoArticulo = new TipoArticuloModel({
    categoria: req.body.categoria,
    impuesto: req.body.impuesto,
    activo: req.body.activo,
  });

  newTipoArticulo.save(function(error) {
    if (error) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error en el registro de usuarios' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el login correctamente' });
    }
  })
};

module.exports.listarTodos = function(req, res) {
  TipoArticuloModel.find().then(function(articulos) {
    res.send(articulos);
  });
};

module.exports.find = function(req, res) {
  TipoArticuloModel.findOne({ '_id': req.body.id}, function(err, dato) {
    if (err || !dato) {
      res.json(404, { success: false, msg: 'No se ha encontrado.'});
    } else {
      res.json({ success: true, msg: 'Usuario valido', dato: dato});
    }
  });
};

module.exports.actualizar = function(req, res) {
  TipoArticuloModel.findByIdAndUpdate(req.body._id, { $set: req.body }, function(err, dato) {
    if (err || !dato) {
      res.json(400, { success: false, msg: 'No se ha actualizado.'});
    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.'});
    }
  });
};