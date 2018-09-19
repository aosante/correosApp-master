const express = require('express'),
  router = express.Router(),
  email = require('./send');

router.param('id', function (req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/send_email')
  .post(function (req, res) {
    email.enviar_correo(req, res);
});

module.exports = router;