
const express = require('express'),
      router = express.Router(),
      users = require('./usuarios.api');

router.param('id', function(req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/user_by_email')
  .post(function(req, res){
    users.findByEmail(req, res);
});

router.route('/save_user')
  .post(function(req, res){
    users.registrar(req, res);
});

router.route('/all_users_by_type')
  .get(function(req, res) {
    users.listarTodos(req, res);
});

router.route('/update_user')
  .put(function(req, res){
    users.actualizar(req, res);
});

router.route('/delete_user')
  .put(function(req, res){
    users.eliminar(req, res);
});

module.exports = router;