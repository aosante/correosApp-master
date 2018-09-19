'use strict'

const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose');

let db = mongoose.connection,
    dburl = 'mongodb://admin:admin@ds117849.mlab.com:17849/db_correos_cr',
    port = 4000;

let server = app.listen(port, _server());

mongoose.connect(dburl);
db.on('error', console.error.bind(console, 'Error de conexión: '));
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const usuarios = require('./components/usuarios/usuarios.route');
app.use('/api', usuarios);

const login = require('./components/login/login.route');
app.use('/api', login);

const tiposArticulos = require('./components/tiposArticulos/tiposArticulos.route');
app.use('/api', tiposArticulos);

const tarifas = require('./components/tarifas/tarifas.route');
app.use('/api', tarifas);

const paquetes = require('./components/paquetes/paquetes.route');
app.use('/api', paquetes);

const emails = require('./components/email/email.route');
app.use('/api', emails);

const convenios = require('./components/convenios/convenios.route');
app.use('/api', convenios);

const sucursales = require('./components/sucursales/sucursales.route');
app.use('/api', sucursales);

const tarjetas = require('./components/tarjetas/tarjetas.route');
app.use('/api', tarjetas);

const couriers = require('./components/couriers/couriers.route');
app.use('/api', couriers);

module.exports = app;

function _server(){
  console.log('Conexión establecida en el puerto ' + port);
};