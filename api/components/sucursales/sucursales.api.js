//si requiere al archivo model, los nombres del esquema deben coincidir
const sucursalesModel = require('./sucursales.model');

module.exports.registrar  = function (req, res){

    let newSucursal = new  sucursalesModel({
        numero : req.body.numero,
        nombre : req.body.nombre,
        tel: req.body.tel,
        activo: req.body.activo,
    });

    newSucursal.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la sucursal, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'La sucursal se registró con éxito'});
        }
    });
};

module.exports.listar_sucursales = function(req, res){
    sucursalesModel.find().then(function(sucursales){
        res.send(sucursales);
    });
};

module.exports.buscar_sucursal_por_id = function(req, res){
    sucursalesModel.findOne({'numero' : req.body.numero}).then(
        function(sucursal){
            res.send(sucursal);
        });
};

module.exports.actualizar_sucursal = function(req, res){
    sucursalesModel.findOneAndUpdate({'numero' : req.body.numero}, {$set: req.body}).then(
        function(sucursal, err){
            console.log(err, sucursal);
            if(err || sucursal === null){
                res.json({ success: false, msg: 'No se ha actualizado la sucursal debido al siguiente error: ' + err });
            }else{
                res.json({ success: true, msg: 'La sucursal ha sido modificada con éxito'});
            }
        });
};



