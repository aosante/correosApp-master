let mongoose = require('mongoose');

let TipoArticuloSchema = new mongoose.Schema({
  categoria: {type: String, required : true},
  impuesto: {type: Number, required : true},
  activo: {type: Number, required : true},
});

module.exports = mongoose.model('TipoArticulo', TipoArticuloSchema);