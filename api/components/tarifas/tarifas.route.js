const express = require('express'),
  router = express.Router(),
  tarifas = require('./tarifas.api');

router.param('id', function (req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/save_tarifa')
  .post(function (req, res) {
    tarifas.registrar(req, res);
});

router.route('/get_all_tarifa')
  .get(function (req, res) {
    tarifas.listarTodos(req, res);
});

router.route('/get_tarifa')
  .post(function (req, res) {
    tarifas.find(req, res);
});

router.route('/update_tarifa')
  .put(function (req, res) {
    tarifas.actualizar(req, res);
});

module.exports = router;