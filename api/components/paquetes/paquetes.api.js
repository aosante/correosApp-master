const PaqueteModel = require('./paquetes.model');

module.exports.registrar = function(req, res) {
  req.body.data = JSON.parse(req.body.data);

  let newPaquete = new PaqueteModel({
    numero_tracking: req.body.data[0],
    peso: req.body.data[1],
    courier: req.body.data[2],
    sucursal: req.body.data[3],
    sucursal_peso: req.body.data[4],
    sucursal_kilometro: req.body.data[5],
    categoria: req.body.data[6],
    categoria_impuesto: req.body.data[7],
    precio_inicial: req.body.data[8],
    precio_final: req.body.data[9],
    usuario: req.body.data[10],
    tarjeta: req.body.data[11],
    estado: req.body.data[12]
  });

  newPaquete.save(function(error) {
    if (error) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error en el registro de paquetes' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el usuario correctamente' });
    }
  })
};

module.exports.findByEmail = function(req, res) {
  console.log(req.body);
  PaqueteModel.find({'usuario': req.body.usuario}, function(err, paquete) {
    if (err || paquete === null) {
      res.json(404, { success: false, msg: 'No se ha encontrado.'});
    } else {
      res.json({ success: true, msg: 'Usuario valido', data: paquete });
    }
  });
};

module.exports.listarTodos = function(req, res) {
  PaqueteModel.find().then(function(paquetes) {
    res.send({ success: true, data: paquetes });
  });
};


module.exports.actualizar = function(req, res) {
  PaqueteModel.findOneAndUpdate({"numero_tracking": req.body.numero_tracking}, { $set: req.body }, function(err, paquete) {
    if (err) {
      res.json(400, { success: false, msg: 'No se ha actualizado.'});
    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};