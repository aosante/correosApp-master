let mongoose = require('mongoose');

let sucursalSchema = new mongoose.Schema({
    numero : {type: Number, required : true},
    nombre : {type: String, required : true},
    tel : {type: String, required : true},
    activo : {type: String, required : true}
});

module.exports = mongoose.model('Sucursales', sucursalSchema);