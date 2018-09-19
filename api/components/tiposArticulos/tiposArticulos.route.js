const express = require('express'),
  router = express.Router(),
  tiposArticulos = require('./tiposArticulos.api');

router.param('id', function (req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/save_article')
  .post(function (req, res) {
    tiposArticulos.registrar(req, res);
});

router.route('/get_all_article')
  .get(function (req, res) {
    tiposArticulos.listarTodos(req, res);
});

router.route('/get_article')
  .post(function (req, res) {
    tiposArticulos.find(req, res);
});

router.route('/update_article')
  .put(function (req, res) {
    tiposArticulos.actualizar(req, res);
});

module.exports = router;