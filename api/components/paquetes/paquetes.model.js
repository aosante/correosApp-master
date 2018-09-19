let mongoose = require('mongoose');

let PaqueteSchema = new mongoose.Schema({
  numero_tracking: {type: String, required : true},
  peso: {type: Number, required : true},
  courier: {type: String, required : true},
  sucursal: {type: String, required : true},
  sucursal_peso: {type: Number, required : true},
  sucursal_kilometro: {type: Number, required : true},
  categoria: {type: String, required : true},
  categoria_impuesto: {type: Number, required : true},
  precio_inicial: {type: Number, required : true},
  precio_final: {type: Number, required : true},
  usuario: {type: String, required : true},
  tarjeta: {type: String, required : true},
  estado: {type: String, required : true},
  repartidor: {type: String},
  distancia_kilometro: {type: Number}
});

module.exports = mongoose.model('Paquete', PaqueteSchema);