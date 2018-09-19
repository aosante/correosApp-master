let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  primer_nombre: {type: String, required : true},
  segundo_nombre: {type: String},
  primer_apellido: {type: String, required : true},
  segundo_apellido: {type: String},
  identificacion: {type: String, required : true},
  correo_electronico: {type: String, required : true},
  foto_perfil: {type: String},
  telefono_1: {type: String, required : true},
  telefono_2: {type: String},
  fecha_nacimiento: {type: String, required : true},
  genero: {type: String, required : true},
  provincia: {type: String},
  canton: {type: String},
  distrito: {type: String},
  direccion: {type: String},
  sucursal: {type: String},
  puesto_real: {type: String},
  tipo_usuario: {type: String, required : true},
  activo: {type: String, required : true}
});

module.exports = mongoose.model('User', UserSchema);