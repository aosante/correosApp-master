let mongoose = require('mongoose');

let courierSchema = new mongoose.Schema({
    numero : {type: Number, required : true},
    nombre : {type: String, required : true},
    activo : {type: String, required : true}
});

module.exports = mongoose.model('Couriers', courierSchema);