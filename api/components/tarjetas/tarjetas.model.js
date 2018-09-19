let mongoose = require('mongoose');

let tarjetasSchema = new mongoose.Schema({
    id : {type: String, required : true},
    nombre : {type: String, required : true},
    numero : {type: Number, required : true},
    year : {type: String, required : true},
    month : {type: String, required : true},
    cvv : {type: String, required : true},
    correo : {type: String, required : true},
    activo : {type : String, required : true}

});

module.exports = mongoose.model('Tarjetas', tarjetasSchema);