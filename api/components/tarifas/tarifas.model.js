let mongoose = require('mongoose');

let TarifasSchema = new mongoose.Schema({
  peso: {type: Number, required : true},
  sucursal: {type: String, required : true},
  kilometro: {type: Number, required : true},
  activo: {type: String, required : true},
});

module.exports = mongoose.model('Tarifa', TarifasSchema);