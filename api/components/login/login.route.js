const express = require('express'),
  router = express.Router(),
  login = require('./login.api');

router.param('id', function (req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/save_login')
  .post(function (req, res) {
    login.registrar(req, res);
});

router.route('/login')
  .post(function (req, res) {
    login.find(req, res);
});

router.route('/update_login')
  .put(function (req, res) {
    login.actualizar(req, res);
});

module.exports = router;