//si requiere al archivo model, los nombres del esquema deben coincidir
const tarjetasModel = require('./tarjetas.model');

module.exports.registrar  = function (req, res){

    let newTarjeta = new  tarjetasModel({
        id: req.body.id,
        nombre: req.body.nombre,
        numero: req.body.numero,
        year: req.body.year,
        month: req.body.month,
        cvv: req.body.cvv,
        correo: req.body.correo,
        activo: req.body.activo,
    });

    newTarjeta.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la sucursal, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'La sucursal se registró con éxito'});
        }
    });
};

module.exports.listar_tarjetas = function(req, res){
    tarjetasModel.find().then(function(tarjetas){
        res.send(tarjetas);
    });
};

module.exports.buscar_tarjeta_por_id = function(req, res){
    tarjetasModel.findOne({'id' : req.body.id}).then(
        function(tarjeta){
            res.send(tarjeta);
        });
};

module.exports.buscar_tarjetas_por_email = function(req, res){
    tarjetasModel.find({'correo' : req.body.correo, 'activo': '1'}).then(
        function(tarjetas){
            res.send(tarjetas);
        });
};

module.exports.actualizar_tarjeta = function(req, res){
    console.log(req.body);
    tarjetasModel.findOneAndUpdate({'id' : req.body.id}, {$set: req.body}).then(
        function(tarjeta, err){
            console.log(err, tarjeta);
            if(err || tarjeta === null){
                res.json({ success: false, msg: 'No se ha actualizado la tarjeta debido al siguiente error: ' + err });
            }else{
                res.json({ success: true, msg: 'La tarjeta ha sido modificada con éxito'});
            }
        });
};



