//si requiere al archivo api, los nombres de las funciones deben coincidir
const express = require('express');
const router = express.Router();
//cambiar el nombre de esta constante en todas
const tarjetas = require('./tarjetas.api');

router.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

router.route('/registrar_tarjeta')
    .post(function(req, res){
    tarjetas.registrar(req, res);
});

router.route('/listar_todas_tarjetas')
    .get(function(req, res){
    tarjetas.listar_tarjetas(req, res);
});

router.route('/buscar_tarjeta_id')
    .post(function(req, res){
        tarjetas.buscar_tarjeta_por_id(req, res);
    });

router.route('/buscar_tarjetas_email')
    .post(function(req, res){
        tarjetas.buscar_tarjetas_por_email(req, res);
    });

router.route('/actualizar_tarjeta')
    .put(function(req, res){
        tarjetas.actualizar_tarjeta(req, res);
    });



module.exports = router;