let mongoose = require('mongoose');

let convenioSchema = new mongoose.Schema({
    nombre : {type:String, required:true},
    descripcion : {type:String, required:true},
    activo: {type:String, required:true} 
});

module.exports = mongoose.model('Convenio', convenioSchema);