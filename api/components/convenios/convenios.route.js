const express = require('express');
const router = express.Router();
const convenios = require('./convenios.api');

// route.param('id', function(req, res, next, id){
//     req.body.id = id;
//     next();
// });

router.route('/save_convenio')
    .post(function(req, res){
    convenios.registrar(req, res);
});

router.route('/listar_conv')
    .get(function(req, res){
        convenios.listarConv(req, res);
});

router.route('/buscar_convenio_id')
.post(function(req, res){
  convenios.buscar_convenio_por_id(req, res);
});

router.route('/update_convenios')
  .put(function(req, res){
    convenios.actualizar_convenio(req,res);
});

module.exports = router;