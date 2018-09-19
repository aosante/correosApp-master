//si requiere al archivo model, los nombres del esquema deben coincidir
const couriersModel = require('./couriers.model');

module.exports.registrar  = function (req, res){

    let newCourier = new  couriersModel({
        numero : req.body.numero,
        nombre : req.body.nombre,
        activo: req.body.activo
    });

    newCourier.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la sucursal, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'La sucursal se registró con éxito'});
        }
    });
};

module.exports.listar_couriers = function(req, res){
    couriersModel.find().then(function(couriers){
        res.send(couriers);
    });
};

module.exports.buscar_courier_por_id = function(req, res){
    couriersModel.findOne({'numero' : req.body.numero}).then(
        function(courier){
            res.send(courier);
        });
};

module.exports.actualizar_courier = function(req, res){
    couriersModel.findOneAndUpdate({'numero' : req.body.numero}, {$set: req.body}).then(
        function(courier, err){
            console.log(err, courier);
            if(err || courier === null){
                res.json({ success: false, msg: 'No se ha actualizado el courier debido al siguiente error: ' + err });
            }else{
                res.json({ success: true, msg: 'El courier ha sido modificada con éxito'});
            }
        });
};



