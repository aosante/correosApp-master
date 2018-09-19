//si requiere al archivo api, los nombres de las funciones deben coincidir
const express = require('express');
const router = express.Router();
//cambiar el nombre de esta constante en todas
const sucursales = require('./sucursales.api');

router.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

router.route('/registrar_sucursal')
    .post(function(req, res){
    sucursales.registrar(req, res);
});

router.route('/listar_todas_sucursales')
    .get(function(req, res){
    sucursales.listar_sucursales(req, res);
});

router.route('/buscar_sucursal_id')
    .post(function(req, res){
        sucursales.buscar_sucursal_por_id(req, res);
    });

router.route('/actualizar_sucursal')
    .put(function(req, res){
        sucursales.actualizar_sucursal(req, res);
    });



module.exports = router;