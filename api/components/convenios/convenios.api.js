const convenioModel = require('./convenios.model');

module.exports.registrar = function(req, res){
    let newConvenio = new convenioModel({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        activo : req.body.activo
    });

    newConvenio.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el convenio, error inesperado' + error});
        }else{
            res.json({success : true, msg : 'El convenio se ha registrado satisfactoriamente'});
        }
    });
};

module.exports.listarConv = function(req, res){
    convenioModel.find().then(function(convenios){
        res.send(convenios);
    });
};

module.exports.buscar_convenio_por_id = function(req, res){
    convenioModel.findById({_id : req.body.id}).then(
      function(convenio){
        res.send(convenio);
      }
    )
};


module.exports.actualizar_convenio = function(req, res) {
    convenioModel.findByIdAndUpdate(req.body._id, { $set: req.body }, function(err, user) {
      if (err) {
        res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });
  
      } else {
        res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
      }
    });
  };