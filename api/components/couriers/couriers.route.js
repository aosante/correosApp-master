//si requiere al archivo api, los nombres de las funciones deben coincidir
const express = require('express');
const router = express.Router();
//cambiar el nombre de esta constante en todas
const couriers = require('./couriers.api');

router.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

router.route('/registrar_courier')
    .post(function(req, res){
    couriers.registrar(req, res);
});

router.route('/listar_todos_couriers')
    .get(function(req, res){
    couriers.listar_couriers(req, res);
});

router.route('/buscar_courier_id')
    .post(function(req, res){
        couriers.buscar_courier_por_id(req, res);
    });

router.route('/actualizar_courier')
    .put(function(req, res){
        couriers.actualizar_courier(req, res);
    });



module.exports = router;